import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from './data.service';
import { Data } from './data.model';
import { Observable } from 'rxjs/Observable';
import { D3Service, D3, Selection, SelectionFn } from 'd3-ng2-service';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {
  data: Data;
  poll: any;

  d3: D3;
  parentNativeElement: any;
  scale = 100;

  load: number;
  generator: number;
  motor: number;


  constructor(private dataService: DataService, element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    // this.parentNativeElement = element.nativeElement;
  }


  private init(svg) {
    svg.selectAll('rect')
    .data([0, 0, 0, 0, 0])
    .enter()
    .append('rect')
    .attrs({
      x: (d: any, i: any) => i * 100 + 10 || 0,
      y: (d: any, i: any) => 270 - d * this.scale || 0,
      width: 90,
      height: (d: any, i) => (d * this.scale) || 0,
      fill: (d: any, i) => this.d3.rgb(0, d * 50, 0)
    });

    svg.selectAll('rect').exit().remove();

    svg.selectAll('text.labels')
    .data(['Solar (V)', 'Store (V)', 'Load (A)', 'Gen+ (V)', 'Gen- (V)'])
    .enter()
    .append('text')
    .attrs({
      x: (d: any, i: any) => i * 100 + 55,
      y: 290,
      fill: '#fff',
      'text-anchor': 'middle',
      class: 'labels'
    })
    .text(d => d);

    svg
    .append('text')
    .attrs({
      x: 150,
      y: 30,
      fill: '#fff',
      id: 'title'
    })
    .text('Solar Sim | Smart Grid Controller');

    svg.selectAll('text.values')
    .data([0, 0, 0, 0, 0])
    .enter()
    .append('text')
    .attrs({
      x: (d, i) => i * 100 + 55,
      y: 250,
      fill: '#fff',
      class: 'values',
      'text-anchor': 'middle'
    })
    .text(d => d);
  }

  private update(svg, data) {
    svg.selectAll('rect')
    .data(data)
    .transition()
    .duration(2000)
    .ease(this.d3.easeLinear)
    .attrs({
      y: (d: any, i) => 270 - d * this.scale || 0,
      height: (d: any, i) => (d * this.scale) || 0,
      fill: (d: any, i) => this.d3.rgb(0, d * 50, 0)
    });
    const units = ['V', 'V', 'A', 'V', 'V'];
    svg.selectAll('text.values')
    .data(data)
    .transition()
    .duration(2000)
    .ease(this.d3.easeLinear)
    .attrs({
      y: (d, i) => 250 - d * this.scale,
      fill: '#fff',
    })
    .text((d, i) => d + ' ' + units[i]);
  }

  ngOnInit() {
    const d3 = this.d3;
    // const d3ParentElement = d3.select(this.parentNativeElement);
    const d3ParentElement = d3.select('#chart');
    const svg = d3ParentElement
    .append('svg')
    .attr('width', 800)
    .attr('height', 300)
    .attr('class', 'svg-canvas');
    this.init(svg);

    this.dataService.getData().subscribe(data => {
      this.data = data;
      this.update(svg, Object.values(data.readings));
    }, err => { console.error(err); });

  }

  send() {
    this.dataService.postData({
      load: this.load * 255 / 100,
      generator: this.generator,
      motor: this.motor
    }).subscribe(data => {
      console.log(data);
    });
  }
}

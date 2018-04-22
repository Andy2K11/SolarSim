import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { Data } from './data.model';
import { Observable } from 'rxjs/Observable';
import { D3Service, D3, Selection, SelectionFn } from 'd3-ng2-service';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit, OnDestroy {
  data: Data;
  poll: any;

  d3: D3;
  parentNativeElement: any;
  scale = 80;

  load = 0;
  generator: boolean;
  motor: boolean;

  subscription;

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
      y: (d: any, i: any) => 370 - d * this.scale || 0,
      width: 90,
      height: (d: any, i) => (d * this.scale) || 0,
      fill: (d: any, i) => this.d3.rgb(0, d * 50, 0)
    });

    svg.selectAll('rect').exit().remove();

    svg.selectAll('text.labels')
    .data(['Solar (V)', 'Store (V)', 'Load (mA)', 'Gen+ (V)', 'Gen- (V)'])
    .enter()
    .append('text')
    .attrs({
      x: (d: any, i: any) => i * 100 + 55,
      y: 390,
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
      y: 350,
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
      y: (d: any, i) => {
        if (i === 2) {
          return 370 - d * this.scale / 20 || 0;
        }
        return 370 - d * this.scale || 0;
      },
      height: (d: any, i) => {
        if (i === 2) {
          return d * this.scale / 20 || 0;
        }
        return d * this.scale || 0;
      },
      fill: (d: any, i) => {
        switch (i) {
          case 0:
            switch (true) {
              case (d < 2): return '#00f';
              case (d < 4.8): return '#0f0';
              default: return '#ff0';
            }
          case 1:
            switch (true) {
              case (d < 1.7): return '#00f';
              case (d < 2.3): return '#0f0';
              case (d < 2.5): return '#f80';
              default: return '#f00';
            }
          case 2:
            switch (true) {
              case (d < 20): return '#00f';
              case (d < 50): return '#0f0';
              case (d < 60): return '#f80';
              default: return '#f00';
            }
          default: return this.d3.rgb(0, d * 50, 0);
        }
      }
    });
    const units = ['V', 'V', 'mA', 'V', 'V'];
    svg.selectAll('text.values')
    .data(data)
    .transition()
    .duration(2000)
    .ease(this.d3.easeLinear)
    .attrs({
      y: (d, i) => {
        if (i === 2) {
          return 350 - d * this.scale / 20 || 0;
        }
        return 350 - d * this.scale || 0;
      },
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
    .attr('width', 600)
    .attr('height', 400)
    .attr('class', 'svg-canvas');
    this.init(svg);

    this.subscription = this.dataService.getData().subscribe(data => {
      this.data = data;
      this.update(svg, Object.values(data.readings));
    }, err => { console.error(err); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  send() {
    this.dataService.postData({
      load: this.load * 255 / 100,
      generator: this.generator ? 255 : 0,
      motor: this.motor ? 255 : 0
    }).subscribe(data => {
      console.log(data);
    });
  }
}

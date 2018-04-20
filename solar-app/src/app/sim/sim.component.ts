import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from './data.service';
import { Data } from './data.model';
import { Observable } from 'rxjs/Observable';
import { D3Service, D3, Selection } from 'd3-ng2-service';

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

  constructor(private dataService: DataService, element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  private update(svg, data) {
    svg.selectAll('rect').remove();
    svg.selectAll('rect')
    .data(data).enter()
    .append('rect')
    .attrs({
      x: (d, i) => i * 55,
      y: (d: number, i) => 300 - d * this.scale,
      width: 50,
      height: (d: number, i) => (d * this.scale),
      fill: (d: number, i) => `rgb(0, ${d * 10}, 0)`
    });

  }

  ngOnInit() {
    const d3 = this.d3;
    const d3ParentElement = d3.select(this.parentNativeElement);
    const svg = d3ParentElement
    .append('svg')
    .attr('width', 800)
    .attr('height', 300)
    .attr('class', 'svg-canvas');

    this.dataService.getData().subscribe(data => {
      this.data = data;
      data.readings.genHighVoltage = Math.random() * 3;
      this.update(svg, Object.values(data.readings));
    }, err => { console.error(err); });
  }
}

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

  constructor(private dataService: DataService, element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    }, err => { console.error(err); });

    const d3 = this.d3;
    const d3ParentElement = d3.select(this.parentNativeElement);

    d3ParentElement.style('color', 'red');
  }
}

import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Data } from './data.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {
  data: Data;
  constructor(private dataService: DataService) { }
  poll: any;

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    }, err => { console.error(err); });
  }
}

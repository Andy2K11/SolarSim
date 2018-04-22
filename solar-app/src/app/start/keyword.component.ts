import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {
  @Input() keyword;

  constructor() { }

  ngOnInit() {
  }

}

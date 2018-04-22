import { Component, OnInit } from '@angular/core';
import { KeywordService } from './keyword.service';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  styleUrls: ['./keyword-list.component.scss'],
  providers: [KeywordService]
})
export class KeywordListComponent implements OnInit {
  keywords;

  constructor(private keywordService: KeywordService) { }

  ngOnInit() {
    this.keywords = this.keywordService.getKeywords();
  }

}

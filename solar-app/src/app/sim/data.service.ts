import { Injectable } from '@angular/core';
import { Data } from './data.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/observable/interval';

// https://www.learnrxjs.io/recipes/http-polling.html

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<Data> {
    return Observable.interval(2000).pipe(mergeMap(() => {
      return this.httpClient.get<Data>('//localhost:3000/data/');
    }));
  }
}

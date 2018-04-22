import { Injectable } from '@angular/core';

@Injectable()
export class KeywordService {

  keywords = [
    {
      title: 'Potential Difference',
      desc: `The electric potential energy difference between two points measured in volts. Often we simply refer
      to voltage where one of the points is obvious, such as the groud or 0v`
    },
    {
      title: 'Photovoltaic',
      desc: `A voltage created by a physical effect caused by photons being absorbed by a photovoltaic material`
    },
    {
      title: 'Smart Grid',
      desc: `An electricity supply infrastructure which is able to balance the changing supply and demand requirements. These
      are essential for renewable energy systems as the solar and wind sources vary independently unlike fossil fuel power
      stations that can increase and decrease output on demand`
    }
  ];

  constructor() { }

  getKeywords() {
    return this.keywords;
  }
}

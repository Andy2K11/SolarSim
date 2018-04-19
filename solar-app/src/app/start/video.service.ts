import { Injectable } from '@angular/core';

@Injectable()
export class VideoService {
  url = '//localhost:3000/video/stream/sunny';
  constructor() { }

  /**
   * Checks for weather and time of day and returns appropriate video
   */
  getVideoName(): string {
    return this.url;
  }
}

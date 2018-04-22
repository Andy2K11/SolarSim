import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class VideoService {
  url = `//${environment.domain}:3000/video/stream/sunny`;
  constructor() { }

  /**
   * Checks for weather and time of day and returns appropriate video
   */
  getVideoName(): string {
    return this.url;
  }
}

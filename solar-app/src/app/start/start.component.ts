import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  url: string;  // = '//localhost:3000/video/stream/sunny';

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.url = this.videoService.getVideoName();
  }

}

import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  url = `//${environment.domain}:3000/video/stream/sunny`;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.url = this.videoService.getVideoName();
  }

}

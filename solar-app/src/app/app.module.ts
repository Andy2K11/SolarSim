import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SimComponent } from './sim/sim.component';
import { StartComponent } from './start/start.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { VideoService } from './start/video.service';
import { KeywordListComponent } from './start/keyword-list.component';
import { KeywordComponent } from './start/keyword.component';
import { DataService } from './sim/data.service';
import { HttpClientModule } from '@angular/common/http';

import { D3Service } from 'd3-ng2-service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SimComponent,
    StartComponent,
    WelcomeComponent,
    KeywordListComponent,
    KeywordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [VideoService, DataService, D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }

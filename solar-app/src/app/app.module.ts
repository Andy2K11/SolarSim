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
    AppRoutingModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

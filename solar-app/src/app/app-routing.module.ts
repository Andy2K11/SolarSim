import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimComponent } from './sim/sim.component';
import { StartComponent } from './start/start.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },
  {
      path: 'start', component: StartComponent
  },
  {
      path: 'sim', component: SimComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// redirectTo: '/', pathMatch: 'full'

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DvdShoppingSummaryComponent }   from './dvd-shopping-summary.component';
import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'home',  component: DvdShoppingSummaryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

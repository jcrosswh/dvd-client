import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';

import { DvdClientService } from './dvd-client.service';

import { AppComponent } from './app.component';
import { DvdHeaderComponent }  from './dvd-header.component';

@NgModule({
  declarations: [
    AppComponent,
    DvdHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot()
  ],
  providers: [DvdClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }

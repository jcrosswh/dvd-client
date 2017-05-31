import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { DvdClientService } from './services/dvd-client.service';
import { InventoryService } from './services/inventory.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';
import { DvdHeaderComponent }  from './dvd-header.component';
import { DvdShoppingSummaryComponent }  from './dvd-shopping-summary.component';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DvdHeaderComponent,
    DvdShoppingSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    DvdClientService,
    InventoryService,
    CategoryPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

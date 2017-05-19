import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { DvdClientService } from './dvd-client.service';
import { InventoryService } from './inventory.service';

import { AppComponent } from './app.component';
import { DvdHeaderComponent }  from './dvd-header.component';
import { DvdShoppingSummaryComponent }  from './dvd-shopping-summary.component';
import { CategoryPipe } from './category.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DvdHeaderComponent,
    DvdShoppingSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    DvdClientService,
    InventoryService,
    CategoryPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

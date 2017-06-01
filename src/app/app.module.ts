import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { InventoryService } from './services/inventory.service';
import { StoreService } from './services/store.service';
import { CategoryService } from './services/category.service';
import { PaginationService } from './services/pagination.service';
import { DvdClientService } from './services/dvd-client.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { DvdHeaderComponent }  from './components/dvd-header/dvd-header.component';
import { DvdShoppingSummaryComponent }  from './components/dvd-shopping-summary/dvd-shopping-summary.component';
import { DvdShoppingSummaryFilterComponent }  from './components/dvd-shopping-summary/filter/dvd-shopping-summary-filter.component';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DvdHeaderComponent,
    DvdShoppingSummaryComponent,
    DvdShoppingSummaryFilterComponent
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
    InventoryService,
    StoreService,
    CategoryService,
    PaginationService,
    DvdClientService,
    CategoryPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { CategoryPipe } from '../../pipes/category.pipe';
import { DvdClientService } from '../../services/dvd-client.service';
import { InventoryService } from '../../services/inventory.service';
import { PaginationService } from '../../services/pagination.service';

import { Inventory } from '../../domain/inventory';
import { Film } from '../../domain/film';
import { Pagination } from '../../domain/Pagination';

@Component({
  selector: 'dvd-shopping-summary',
  templateUrl: './dvd-shopping-summary.component.html',
  styleUrls: ['./dvd-shopping-summary.component.css']
})
export class DvdShoppingSummaryComponent implements OnInit {
  private subscription:Subscription;
  private paginationSubscription:Subscription;
  private availableInventory:Inventory[];
  private displayInventory:Inventory[][];
  private itemsPerRow:number = 4;
  private isModalShown:boolean;
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  private selectedFilm:Film;
  private pagination:Pagination;

  constructor(
    private dvdClientService: DvdClientService,
    private inventoryService: InventoryService,
    private paginationService: PaginationService,
    private categoryPipe: CategoryPipe
  ) {
    this.availableInventory = [];
    this.displayInventory = [];
    this.isModalShown = false;
  }

  public ngOnInit() {
    this.paginationSubscription = this.paginationService.getPagination()
       .subscribe((pagination) => {
         this.pagination = pagination;
         this.generateDisplayList();
       });
    this.subscription = this.inventoryService.getInventory()
       .subscribe((items) => {
         this.paginationService.setCurrentPage(1);
         this.availableInventory = items;
         if (this.availableInventory) {
           this.paginationService.setTotalItems(this.availableInventory.length);
           this.generateDisplayList();
         }
       });
    this.paginationService.setCurrentPage(1);
    this.paginationService.setMaxSize(5);
  }

  public updatePage(event: any) {
    this.paginationService.setCurrentPage(event.page);
  }

  public showModal(title:string):void {
    this.dvdClientService.getFilmDetail(title)
        .then(film => this.selectedFilm = film);
    this.isModalShown = true;
  }

  public hideModal():void {
    this.autoShownModal.hide();
  }

  public onHidden():void {
    this.isModalShown = false;
  }

  private generateDisplayList() {
    this.displayInventory = [];
    for (var i = 0; i < this.pagination.itemsPerPage / this.itemsPerRow; i++) {
      this.displayInventory[i] = this.availableInventory.slice(
        (this.pagination.currentPage - 1) * this.pagination.itemsPerPage + i * this.itemsPerRow,
        (this.pagination.currentPage - 1) * this.pagination.itemsPerPage + i * this.itemsPerRow + this.itemsPerRow
      );
    }
  }
}

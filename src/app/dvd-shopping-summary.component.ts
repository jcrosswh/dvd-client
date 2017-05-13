import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { InventoryService } from './inventory.service';
import { Inventory } from './inventory';

@Component({
  selector: 'dvd-shopping-summary',
  templateUrl: './dvd-shopping-summary.component.html'
})
export class DvdShoppingSummaryComponent implements OnInit {
  private subscription: Subscription;
  private availableInventory: Inventory[];
  private maxSize:number = 5;
  private itemsPerPage:number;
  private pgTotalItems:number;
  private pgCurrentPage:number;
  private numPages:number = 0;
  private maxSizes:Array<number>;
  private displayInventory: Inventory[];

  constructor(private inventoryService: InventoryService) {
    this.availableInventory = [];
    this.pgCurrentPage = 1;
    this.pgTotalItems = 0;
    this.maxSizes = [5, 10, 20, 50];
    this.itemsPerPage = this.maxSizes[1];
    this.displayInventory = [];
  }

  public ngOnInit() {
    this.subscription = this.inventoryService.getInventory()
       .subscribe((items) => {
         this.pgCurrentPage = 1;
         this.availableInventory = items;
         if (this.availableInventory) {
           this.pgTotalItems = this.availableInventory.length;
           this.generateDisplayList();
         }
       });
  }

  public updatePage(event: any) {
    this.pgCurrentPage = event.page;
    this.generateDisplayList();
  }

  public itemCountChanged(event: any) {
    this.generateDisplayList();
  }

  private generateDisplayList() {
    this.displayInventory = this.availableInventory.slice(
      (this.pgCurrentPage * this.itemsPerPage) - this.itemsPerPage,
      this.pgCurrentPage * this.itemsPerPage
    );
  }
}

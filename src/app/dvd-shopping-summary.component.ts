import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { InventoryService } from './inventory.service';
import { Inventory } from './inventory';

@Component({
  selector: 'dvd-shopping-summary',
  templateUrl: './dvd-shopping-summary.component.html',
  styleUrls: ['./dvd-shopping-summary.component.css']
})
export class DvdShoppingSummaryComponent implements OnInit {
  private subscription: Subscription;
  private availableInventory: Inventory[];
  private maxSize:number = 5;
  private itemsPerPage:number;
  private pgTotalItems:number;
  private pgCurrentPage:number;
  private pgTotalPages:number;
  private numPages:number = 0;
  private maxSizes:Array<number>;
  private displayInventory:Inventory[][];
  private categories:string[];
  private selectedCategory:string;
  private itemsPerRow:number = 4;

  constructor(private inventoryService: InventoryService) {
    this.availableInventory = [];
    this.pgCurrentPage = 1;
    this.pgTotalItems = 0;
    this.maxSizes = [4, 8, 12, 24];
    this.itemsPerPage = this.maxSizes[1];
    this.displayInventory = [];
    this.categories = [
      'All',
      'Action',
      'Comedy',
      'Family',
      'Games',
      'Horror',
      'Sci-Fi'
    ];
    this.selectedCategory = this.categories[0];
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
    this.displayInventory = [];
    for (var i = 0; i < this.itemsPerPage / this.itemsPerRow; i++) {
      this.displayInventory[i] = this.availableInventory.slice(
        (this.pgCurrentPage * this.itemsPerRow * (i + 1)) - this.itemsPerRow,
        this.pgCurrentPage * this.itemsPerRow * (i + 1)
      );
    }
  }
}

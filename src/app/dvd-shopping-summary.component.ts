import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CategoryPipe } from './category.pipe';
import { DvdClientService } from './dvd-client.service';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory';

@Component({
  selector: 'dvd-shopping-summary',
  templateUrl: './dvd-shopping-summary.component.html',
  styleUrls: ['./dvd-shopping-summary.component.css']
})
export class DvdShoppingSummaryComponent implements OnInit {
  private subscription:Subscription;
  private availableInventory:Inventory[];
  private filteredInventory:Inventory[];
  private maxSize:number = 5;
  private itemsPerPage:number;
  private pgTotalItems:number;
  private pgCurrentPage:number;
  private pgTotalPages:number;
  private numPages:number = 0;
  private maxSizes:Array<number>;
  private displayInventory:Inventory[][];
  private categories:string[];
  private itemsPerRow:number = 4;
  private selectedCategories:string[];

  constructor(
    private dvdClientService: DvdClientService,
    private inventoryService: InventoryService,
    private categoryPipe: CategoryPipe
  ) {
    this.availableInventory = [];
    this.filteredInventory = [];
    this.pgCurrentPage = 1;
    this.pgTotalItems = 0;
    this.maxSizes = [4, 8, 12, 24];
    this.itemsPerPage = this.maxSizes[3];
    this.displayInventory = [];
    this.categories = [];
    this.selectedCategories = [];
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
     this.dvdClientService.getCategories()
         .then(categories => {
           this.categories = categories;
         });
  }

  public updatePage(event: any) {
    this.pgCurrentPage = event.page;
    this.generateDisplayList();
  }

  public applyCategoryFilter(event: any) {
    if (event.checked) {
      if (this.selectedCategories.indexOf(event.name) === -1) {
        this.selectedCategories.push(event.name);
      }
    } else {
      var index = this.selectedCategories.indexOf(event.name);
      if (index !== -1) {
          this.selectedCategories.splice(index, 1);
      }
    }
    this.generateDisplayList();
  }

  public itemCountChanged(event: any) {
    this.generateDisplayList();
  }

  private generateDisplayList() {
    this.displayInventory = [];
    this.filterList();
    for (var i = 0; i < this.itemsPerPage / this.itemsPerRow; i++) {
      this.displayInventory[i] = this.filteredInventory.slice(
        (this.pgCurrentPage * this.itemsPerRow * (i + 1)) - this.itemsPerRow,
        this.pgCurrentPage * this.itemsPerRow * (i + 1)
      );
    }
  }

  private filterList() {
    this.filteredInventory = this.categoryPipe.transform(this.availableInventory, this.selectedCategories);
  }
}

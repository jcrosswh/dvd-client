import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { CategoryPipe } from './category.pipe';
import { DvdClientService } from './dvd-client.service';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory';
import { Film } from './film';

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
  private categories:any[];
  private itemsPerRow:number = 4;
  private selectedCategories:string[];
  private isModalShown:boolean;
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  private selectedFilm:Film;

  constructor(
    private dvdClientService: DvdClientService,
    private inventoryService: InventoryService,
    private categoryPipe: CategoryPipe
  ) {
    this.availableInventory = [];
    this.filteredInventory = [];
    this.pgCurrentPage = 1;
    this.pgTotalItems = 0;
    this.maxSizes = [4, 8, 12, 24, 48, 96];
    this.itemsPerPage = this.maxSizes[3];
    this.displayInventory = [];
    this.categories = [];
    this.selectedCategories = [];
    this.isModalShown = false;
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
           categories.forEach(
             category => this.categories.push({name: category, isChecked: false})
           );
         });
  }

  public updatePage(event: any) {
    this.pgCurrentPage = event.page;
    this.generateDisplayList();
  }

  public applyCategoryFilter(category: any) {
    if (category.isChecked) {
      if (this.selectedCategories.indexOf(category.name) === -1) {
        this.selectedCategories.push(category.name);
      }
    } else {
      var index = this.selectedCategories.indexOf(category.name);
      if (index !== -1) {
          this.selectedCategories.splice(index, 1);
      }
    }
    this.generateDisplayList();
  }

  public itemCountChanged(event: any) {
    this.generateDisplayList();
  }

  public resetFilter(element: any) {
    element.blur();
    this.categories.forEach(category => category.isChecked = false);
    this.selectedCategories = [];
    this.generateDisplayList();
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
    this.pgTotalItems = this.filteredInventory.length;
  }
}

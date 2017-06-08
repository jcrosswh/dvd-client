import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { StoreService } from './store.service';
import { CategoryService } from './category.service';
import { DvdClientService } from './dvd-client.service';

import { Inventory } from '../domain/inventory';

@Injectable()
export class InventoryService {
    private availableInventory: Subject<Array<Inventory>>;
    private baseInventory: Array<Inventory>;
    private storeSubscription: Subscription;
    private categorySubscription: Subscription;
    private selectedCategories: Set<string>;

    constructor(
      private storeService: StoreService,
      private categoryService: CategoryService,
      private dvdClientService: DvdClientService
    ) {
      this.availableInventory = new Subject<Array<Inventory>>();
      this.selectedCategories = new Set();
      this.storeSubscription = this.storeService.getStore()
         .subscribe((storeId) => {
           dvdClientService.getAvailableInventory(storeId)
           .subscribe((result) => {
             this.baseInventory = result;
             this.setInventory(this.baseInventory);
           });
         });

      this.categorySubscription = this.categoryService.getSelectedCategories()
         .subscribe((categories: Set<string>) => {
           this.selectedCategories = categories;
           this.setInventory(this.baseInventory);
         });
    }

    public getInventory(): Observable<Array<Inventory>> {

      function filterOnCategories(inventory: Inventory): boolean {
        return this.size === 0 || this.has(inventory.category);
      }

      console.log(this.availableInventory.asObservable());
      return this.availableInventory.asObservable()
      .map((result: Array<Inventory>) => result.filter(
        filterOnCategories,
        this.selectedCategories));
    }

    public setInventory(inventory: Array<Inventory>) {
      this.availableInventory.next(inventory);
    }
}

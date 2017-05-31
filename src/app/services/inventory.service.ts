import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from './store.service';
import { DvdClientService } from './dvd-client.service';

import { Inventory } from '../domain/inventory';

@Injectable()
export class InventoryService {
    private availableInventory = new ReplaySubject<Array<Inventory>>(1);
    private storeSubscription: Subscription;

    constructor(
      private storeService: StoreService,
      private dvdClientService: DvdClientService
    ) {
      this.storeSubscription = this.storeService.getStore()
         .subscribe((storeId) => {
           dvdClientService.getAvailableInventory(storeId)
           .subscribe((result) => this.setInventory(result));
         });
    }

    public getInventory(): Observable<Array<Inventory>> {
      return this.availableInventory.asObservable()
      .map((result) => result.filter((inventory: Inventory) => inventory.category === 'Horror'));
    }

    public setInventory(inventory: Array<Inventory>) {
      this.availableInventory.next(inventory);
    }
}

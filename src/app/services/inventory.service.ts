import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Inventory } from '../domain/inventory';

@Injectable()
export class InventoryService {
    private availableInventory = new BehaviorSubject<Array<Inventory>>(null);

    public getInventory(): Observable<Array<Inventory>> {
      return this.availableInventory.asObservable();
    }

    public setInventory(inventory: Array<Inventory>) {
      this.availableInventory.next(inventory);
    }
}

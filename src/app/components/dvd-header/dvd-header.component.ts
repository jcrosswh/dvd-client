import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '../../domain/store';
import { DvdClientService } from '../../services/dvd-client.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'dvd-header',
  templateUrl: './dvd-header.component.html',
  styleUrls: ['./dvd-header.component.css']
})
export class DvdHeaderComponent implements OnInit {
  stores: Store[] = [];
  selectedStore: number;

  constructor(
    private dvdClientService: DvdClientService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.dvdClientService.getStores()
      .then(stores => {
        this.stores = stores;
        this.selectedStore = this.stores[0].storeId;
        this.updateInventory();
      });
  }

  public storeSelected(storeId: number) {
    this.selectedStore = storeId;
    this.updateInventory();
  }

  private updateInventory() {
    this.dvdClientService.getAvailableInventory(this.selectedStore)
      .then(inventory => {
        this.inventoryService.setInventory(inventory);
      });
  }
}

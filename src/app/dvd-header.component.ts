import { Component, OnInit } from '@angular/core';

import { Store } from './store';
import { DvdClientService } from './dvd-client.service';

@Component({
  selector: 'dvd-header',
  templateUrl: './dvd-header.component.html'
})
export class DvdHeaderComponent implements OnInit {
  stores: Store[] = [];
  selectedStore: Store;

  constructor(private dvdClientService: DvdClientService) {
  }

  ngOnInit(): void {
    this.dvdClientService.getStores()
      .then(stores => {
        this.stores = stores;
        this.selectedStore = this.stores[0];
      });
  }
}

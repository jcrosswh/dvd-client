import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../../domain/store';
import { DvdClientService } from '../../services/dvd-client.service';
import { StoreService } from '../../services/store.service';
import { InventoryService } from '../../services/inventory.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { LoginService } from '../../services/login.service';

import { Film } from '../../domain/film';
import { Customer } from '../../domain/customer';

@Component({
  selector: 'dvd-header',
  templateUrl: './dvd-header.component.html',
  styleUrls: ['./dvd-header.component.css']
})
export class DvdHeaderComponent implements OnInit {
  stores: Store[] = [];
  selectedStore: number;
  private shoppingCartSubscription: Subscription;
  public shoppingCart:Array<Film>;
  public shoppingCartSize:number;
  public customer: Customer;

  constructor(
    private dvdClientService: DvdClientService,
    private storeService: StoreService,
    private inventoryService: InventoryService,
    private shoppingCartService: ShoppingCartService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.shoppingCartSubscription = this.shoppingCartService.getShoppingCart()
       .subscribe((films) => {
         this.shoppingCart = films;
         if (!films || films.length === 0) {
           this.shoppingCartSize = undefined;
         } else {
           this.shoppingCartSize = films.length;
         }
       });
    this.dvdClientService.getStores()
      .then(stores => {
        this.stores = stores;
        this.storeSelected(this.stores[0].storeId);
      });
    this.loginService.getAuthentication()
      .subscribe((customer) => {
        this.customer = customer;
      });
  }

  public storeSelected(storeId: number) {
    this.selectedStore = storeId;
    this.updateInventory();
  }

  private updateInventory() {
    this.storeService.setStore(this.selectedStore);
  }

  public showLoginModal() {
    this.loginService.showLoginModal();
  }

  public showShoppingCart() {
    this.shoppingCartService.showShoppingCartModal();
  }
}

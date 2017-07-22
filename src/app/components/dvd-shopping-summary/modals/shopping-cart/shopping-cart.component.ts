import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CurrencyPipe } from '@angular/common';

import { DvdClientService } from '../../../../services/dvd-client.service';
import { StoreService } from '../../../../services/store.service';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';

import { Film } from '../../../../domain/film';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private shoppingCartShownSubscription: Subscription;
  private shoppingCartSubscription: Subscription;
  private storeSubscription: Subscription;
  private storeId: number;
  public isModalShown: boolean;
  public films: Array<Film>;
  public total: number;

  constructor(
    private dvdClientService: DvdClientService,
    private storeService: StoreService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.shoppingCartShownSubscription = this.shoppingCartService.getShoppingCartModal()
       .subscribe((shoppingCartModalShown) => {
         this.isModalShown = shoppingCartModalShown;
       });
     this.shoppingCartSubscription = this.shoppingCartService.getShoppingCart()
        .subscribe((films) => {
          this.films = films;

          this.total = 0;
          for (var i = 0; i < this.films.length; i++) {
            this.total += this.films[i].rentalRate;
          }
        });
      this.storeSubscription = this.storeService.getStore()
         .subscribe((storeId) => {
           this.storeId = storeId;
         });
  }

  public checkout() {
    this.dvdClientService.requestCheckout(this.films, this.storeId)
      .then((response) => { this.clearCart(); });
  }

  public clearCart() {
    this.shoppingCartService.clearShoppingCart();
    this.hideModal();
  }

  public hideModal() {
    this.shoppingCartService.hideShoppingCartModal();
  }

}

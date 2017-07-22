import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Film } from '../domain/film';

@Injectable()
export class ShoppingCartService {
  private shoppingCartSubject: Subject<Array<Film>>;
  private shoppingCart: Array<Film>;
  private shoppingCartModalSubject: Subject<boolean>;
  private shoppingCartModal: boolean;

  constructor() {
    // could write this to session/local storage
    this.shoppingCartSubject = new Subject<Array<Film>>();
    this.shoppingCart = new Array<Film>();
    this.shoppingCartSubject.next(this.shoppingCart);
    this.shoppingCartModalSubject = new Subject<boolean>();
    this.hideShoppingCartModal();
  }

  public getShoppingCart(): Observable<Array<Film>> {
    return this.shoppingCartSubject.asObservable();
  }

  public getShoppingCartModal(): Observable<boolean> {
    return this.shoppingCartModalSubject.asObservable();
  }

  public addToShoppingCart(film: Film) {
    this.shoppingCart.push(film);
    this.shoppingCartSubject.next(this.shoppingCart);
  }

  public clearShoppingCart() {
    this.shoppingCart = new Array<Film>();
    this.shoppingCartSubject.next(this.shoppingCart);
  }

  public showShoppingCartModal() {
    this.shoppingCartModal = true;
    this.setShoppingCartModal();
  }

  public hideShoppingCartModal() {
    this.shoppingCartModal = false;
    this.setShoppingCartModal();
  }

  private setShoppingCartModal() {
    this.shoppingCartModalSubject.next(this.shoppingCartModal);
  }

}

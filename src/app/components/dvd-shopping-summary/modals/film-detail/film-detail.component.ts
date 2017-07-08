import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { ShoppingCartService } from '../../../../services/shopping-cart.service';

import { Film } from '../../../../domain/film';

@Component({
  selector: 'film-detail-modal',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  private _title:Film;
  public isModalShown:boolean;
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;

  @Input()
  set selectedFilm(title:Film) {
    this._title = title;
    this.isModalShown = true;
  }

  get selectedFilm():Film {
    return this._title;
  }

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.isModalShown = false;
  }

  public hideModal():void {
    this.autoShownModal.hide();
  }

  public onHidden():void {
    this.isModalShown = false;
  }

  public addToCart(film: Film):void {
    this.shoppingCartService.addToShoppingCart(film);
    this.hideModal();
  }

}

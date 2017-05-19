import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Inventory } from './inventory';
import { Store } from './store';
import { Film } from './film';

@Injectable()
export class DvdClientService {
  private serviceUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getStores(): Promise<Array<Store>> {

    return this.http
      .get(
        this.serviceUrl + '/api/stores'
      )
      .toPromise()
      .then((response) => {
        return response.json() as Store[];
      })
      .catch(this.handleError);
  }

  getCategories(): Promise<Array<string>> {

    return this.http
      .get(
        this.serviceUrl + '/api/categories'
      )
      .toPromise()
      .then((response) => {
        return response.json() as string[];
      })
      .catch(this.handleError);
  }

  getAvailableInventory(storeId: number): Promise<Array<Inventory>> {

    return this.http
      .get(
        this.serviceUrl + '/api/stores/' + storeId + '/inventory'
      )
      .toPromise()
      .then((response) => {
        return response.json() as Inventory[];
      })
      .catch(this.handleError);
  }

  getFilmDetail(title: string): Promise<Film> {

    return this.http
      .get(
        this.serviceUrl + '/api/films?title=' + title
      )
      .toPromise()
      .then((response) => {
        return response.json() as Film;
      })
      .catch(this.handleError);
  }

  private createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('MARY.SMITH@sakilacustomer.org:password'));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

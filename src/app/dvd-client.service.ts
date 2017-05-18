import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Inventory } from './inventory';
import { Store } from './store';

@Injectable()
export class DvdClientService {
  private serviceUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getStores(): Promise<Array<Store>> {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http
      .get(
        this.serviceUrl + '/api/stores',
        { headers: headers }
      )
      .toPromise()
      .then((response) => {
        return response.json() as Store[];
      })
      .catch(this.handleError);
  }

  getAvailableInventory(storeId: number): Promise<Array<Inventory>> {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http
      .get(
        this.serviceUrl + '/api/stores/' + storeId + '/inventory',
        { headers: headers }
      )
      .toPromise()
      .then((response) => {
        return response.json() as Inventory[];
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

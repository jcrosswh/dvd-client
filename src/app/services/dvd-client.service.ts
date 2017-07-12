import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Customer } from '../domain/customer';
import { Inventory } from '../domain/inventory';
import { Store } from '../domain/store';
import { Film } from '../domain/film';

@Injectable()
export class DvdClientService {
  private serviceUrl: string = 'http://localhost:8080';
  private customer: Customer;

  constructor(
    private http: Http
  ) {}

  public getStores(): Promise<Array<Store>> {

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

  public getCategories(): Promise<Array<string>> {

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

  public getAvailableInventory(storeId: number): Observable<Array<Inventory>> {

    return this.http
      .get(
        this.serviceUrl + '/api/stores/' + storeId + '/inventory'
      )
      .map((response) => response.json());
  }

  public getFilmDetail(title: string): Promise<Film> {

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

  public setEmailAndPassword(email: string, password: string): Promise<Response> {

    var headers = new Headers();
    headers.append('Authorization', 'Basic ' +
      btoa(email + ':' + password));

    return this.http
      .get(
        this.serviceUrl + '/api/customers/current',
        { headers: headers }
      )
      .toPromise();
  }

  private createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa(this.customer.email + ':' + this.customer.password));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

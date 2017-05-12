import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Store } from './store';

@Injectable()
export class DvdClientService {
  // private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

  getStores(): Promise<Array<Store>> {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http
      .get(
        'http://localhost:8080/api/stores',
        { headers: headers }
      )
      .toPromise()
      .then((response) => {
        return response.json() as Store[];
      })
      .catch(this.handleError);
  }

  private createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('user:b5985715-3ee7-4039-a5f2-277ed31bc1d1'));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

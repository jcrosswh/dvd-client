import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StoreService {
    private store: Subject<number>;

    constructor() {
      this.store = new Subject<number>();
    }

    public getStore(): Observable<number> {
      return this.store.asObservable();
    }

    public setStore(storeId: number) {
      this.store.next(storeId);
    }
}

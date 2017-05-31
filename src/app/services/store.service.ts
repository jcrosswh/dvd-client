import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StoreService {
    private store = new Subject<number>();

    public getStore(): Observable<number> {
      return this.store.asObservable();
    }

    public setStore(storeId: number) {
      this.store.next(storeId);
    }
}

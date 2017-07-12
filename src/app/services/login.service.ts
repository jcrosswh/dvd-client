import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Customer } from '../domain/customer';

@Injectable()
export class LoginService {
  private loginModalSubject: Subject<boolean>;
  private loginModal: boolean;
  private authenticationSubject: Subject<Customer>;

  constructor() {
    this.loginModalSubject = new Subject<boolean>();
    this.authenticationSubject = new Subject<Customer>();
    this.hideLoginModal();
  }

  public getLoginModal(): Observable<boolean> {
    return this.loginModalSubject.asObservable();
  }

  public getAuthentication(): Observable<Customer> {
    return this.authenticationSubject.asObservable();
  }

  public setAuthentication(customer: Customer) {
    this.authenticationSubject.next(customer);
  }

  public showLoginModal() {
    this.loginModal = true;
    this.setLoginModal();
  }

  public hideLoginModal() {
    this.loginModal = false;
    this.setLoginModal();
  }

  private setLoginModal() {
    this.loginModalSubject.next(this.loginModal);
  }

}

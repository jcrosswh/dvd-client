import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DvdClientService } from '../../../../services/dvd-client.service';
import { LoginService } from '../../../../services/login.service';

import { Customer } from '../../../../domain/customer';

@Component({
  selector: 'login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginShownSubscription: Subscription;
  public isModalShown: boolean;
  public email: string;
  public password: string;

  constructor(
    private dvdClientService: DvdClientService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginShownSubscription = this.loginService.getLoginModal()
       .subscribe((loginModalShown) => {
         this.isModalShown = loginModalShown;
       });
  }

  public hideModal() {
    this.loginService.hideLoginModal();
  }

  public login() {
    this.dvdClientService.setEmailAndPassword(this.email, this.password)
    .then((response) => {
      console.log(response.json());
      this.hideModal();
      this.loginService.setAuthentication(response.json());
    })
    .catch((response) => {
      // TODO: setup error handling.
      // console.log('Error');
      // console.log(response.json());
    });
  }

}

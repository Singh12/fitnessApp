import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {  Observable } from 'rxjs';

import * as formRoot from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authValidation: Observable<boolean>;
@Output() getToggel =  new EventEmitter<any>();
  constructor(private authService: AuthService, private store: Store<formRoot.State>) { }

  ngOnInit() {
    this.authValidation = this.store.select(formRoot.getIsauthenticated);
    // this.authSubscription = this.authService.autValidation.subscribe(
    //   (auth: boolean) => {
    //     this.authValidation = auth;
    //   }
    // );
  }
  setToggel() {
    this.getToggel.emit();
  }
  logOut() {
    this.authService.logOut();
  }
}

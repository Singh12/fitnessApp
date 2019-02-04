import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authValidation = false;
  authSubscription: Subscription;
@Output() getToggel =  new EventEmitter<any>();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.autValidation.subscribe(
      (auth: boolean) => {
        this.authValidation = auth;
      }
    );
  }
  setToggel() {
    this.getToggel.emit();
  }
  logOut() {
    this.authService.logOut();
    this.authSubscription = this.authService.autValidation.subscribe(
      (auth: boolean) => {
        this.authValidation = auth;
      }
    );
  }
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeButton = new EventEmitter<any>();
  authValidation = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.autValidation.subscribe(
      (auth: boolean) => {
        this.authValidation = auth;
      }
    );
  }
  onClose() {
    this.closeButton.emit();
  }
  onLogout() {
    this.onClose();
    this.authService.logOut();
    this.authSubscription = this.authService.autValidation.subscribe(
      (auth: boolean) => {
        this.authValidation = auth;
      }
    );
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}

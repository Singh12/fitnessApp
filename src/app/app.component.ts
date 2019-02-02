import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularApp';
  subscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.authLoginLogout();
    // Code for on refresh expire
    // this.subscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     browserRefresh = !this.router.navigated;
    //     if (browserRefresh) {
    //       this.authService.logOut();
    //     }
    //   }
    // });
  }
}

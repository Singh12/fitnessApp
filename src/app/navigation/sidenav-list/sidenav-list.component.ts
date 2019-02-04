import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

import * as formRoot from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeButton = new EventEmitter<any>();
  authValidation: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<formRoot.State>) { }

  ngOnInit() {
    this.authValidation = this.store.select(formRoot.getIsauthenticated);
  }
  onClose() {
    this.closeButton.emit();
  }
  onLogout() {
    this.onClose();
    this.authService.logOut();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subject, Subscription, Observable } from 'rxjs';
import { UiService } from '../../shaired/ui.service';
import { Store } from '@ngrx/store';
import * as formRoot from 'src/app/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  myGroup: FormGroup;
  forgetSub: Subscription;
  public forgetPasswords = false;
  public loadingBar: Observable<boolean>;
  forget = new Subject<boolean>();
  constructor(private authService: AuthService, private uiService: UiService, private action: Store<formRoot.State>) { }

  ngOnInit() {
   this.loadingBar = this.action.select(formRoot.getisLoading);
    if (!this.forgetPasswords) {
      this.myGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      });
    }
    this.forgetSub = this.forget.subscribe(
      result => {
        this.myGroup = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email])
        });
      }
    );
  }
  formSubmit() {
    if (!this.forgetPasswords) {
      this.authService.login({
        email: this.myGroup.value.email,
        password: this.myGroup.value.password
      });
    } else {
      this.authService.forgetPassword(this.myGroup.value.email);
    }
  }
  forgetPassword() {
    this.forgetPasswords = true;
    this.forget.next(this.forgetPasswords);
  }
  ngOnDestroy() {
    if (this.forgetSub) {
      this.forgetSub.unsubscribe();
    }
  }
}

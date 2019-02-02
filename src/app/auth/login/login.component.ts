import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myGroup: FormGroup;
  private forgetPasswords = false;
  forget = new Subject<boolean>();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (!this.forgetPasswords) {
      this.myGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      });
    }
    this.forget.subscribe(
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

}

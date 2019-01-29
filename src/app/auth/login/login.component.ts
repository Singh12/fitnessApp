import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myGroup: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.myGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  formSubmit() {
    this.authService.login({
      email: this.myGroup.value.email,
      password: this.myGroup.value.password
    });
  }

}

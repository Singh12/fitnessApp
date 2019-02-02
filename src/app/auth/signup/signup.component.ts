import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shaired/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  private loadingBar = true;
  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    this.uiService.progressBarr.subscribe(
      progress => this.loadingBar = progress
    );
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}

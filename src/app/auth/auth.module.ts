import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ShairdModule } from '../shaired/shaired.module';

@NgModule({
    declarations: [SignupComponent, LoginComponent],
    imports: [ReactiveFormsModule,  AngularFireAuthModule, ShairdModule],
    exports: []
})
export class Authmodule {}

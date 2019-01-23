import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
const route: Routes = [
 { path: '', component: WelcomeComponent, pathMatch: 'full' },
 { path: 'signup', component: SignupComponent},
 { path: 'login', component: LoginComponent},
 { path: 'training', component: TrainingComponent},
];
@NgModule({
imports: [
    RouterModule.forRoot(route)
],
exports: [RouterModule]
})
export class AppRouteModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanLoad } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.gard';

const route: Routes = [
 { path: '', component: WelcomeComponent, pathMatch: 'full' },
    { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard]}
];
@NgModule({
imports: [
    RouterModule.forRoot(route)
],
exports: [RouterModule]
})
export class AppRouteModule {}

import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot  ): boolean {
        this.authService.isAuth();
        if (!this.authService.isAuth()) {
            this.router.navigate(['/login']);
         } else {
            return this.authService.isAuth();
         }
    }
    canLoad(route: Route): boolean {
        this.authService.isAuth();
        if (!this.authService.isAuth()) {
            this.router.navigate(['/login']);
        } else {
            return this.authService.isAuth();
        }
    }
}

import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
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
}

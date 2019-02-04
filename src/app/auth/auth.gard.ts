import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as formRoot from 'src/app/app.reducer';
import { take } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router, private store: Store<formRoot.State>) {
    }
    canLoad(route: Route) {
        this.store.select(formRoot.getIsauthenticated).subscribe(
            data => console.log(data)
        );
       return this.store.select(formRoot.getIsauthenticated).pipe(take(1));
    }
}

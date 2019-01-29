import {User} from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
@Injectable()
export class AuthService {
    private user: User;
    autValidation = new Subject<boolean>();
    private isAuthenticated = false;
    constructor(private router: Router, private afAuth: AngularFireAuth) {}
    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
            authData.email,
            authData.password
        ).then( result => {
            console.log(result);
            this.authSuccessfully();
        }).catch(error => console.log(error));
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
            console.log(result);
            this.authSuccessfully();
        }).catch(error => console.log(error));
    }
    logOut() {
        this.afAuth.auth.signOut();
        this.autValidation.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }
    isAuth() {
        return this.isAuthenticated;
    }
    private authSuccessfully() {
        this.isAuthenticated = true;
        this.autValidation.next(true);
        this.router.navigate(['/training']);
    }
 }

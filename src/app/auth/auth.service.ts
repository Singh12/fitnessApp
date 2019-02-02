import {User} from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { TrainingService } from '../training/training.service';
@Injectable()
export class AuthService {
    private user: User;
    autValidation = new Subject<boolean>();
    private isAuthenticated = false;
    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {}
    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
            authData.email,
            authData.password
        ).then( result => {
        }).catch(error => console.log(error));
    }
    // Univarsal setup for login or log out button

    authLoginLogout() {
        this.afAuth.idToken.subscribe(
          //  id => console.log(id)
        );
        this.afAuth.user.subscribe(
            (user) => {
                if (user) {
                    this.isAuthenticated = true;
                    this.autValidation.next(true);
                    this.router.navigate(['/training']);
                } else {
                    this.trainingService.fbUnsubscribe();
                    this.autValidation.next(false);
                    this.router.navigate(['/login']);
                    this.isAuthenticated = false;
                }
            }
        );
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
        }).catch(error => console.log(error));
    }
    forgetPassword(email: string) {
        this.afAuth.auth.sendPasswordResetEmail(email).then(
            () => console.log('Email Sent')
        ).catch(
            () => console.log('Error')
        );
    }
    logOut() {
        this.afAuth.auth.signOut();
    }
    isAuth() {
        return this.isAuthenticated;
    }
 }

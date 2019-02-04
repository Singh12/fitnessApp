import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UiService } from '../shaired/ui.service';
import { Action, Store } from '@ngrx/store';
import * as formApp from '../app.reducer';
@Injectable()
export class AuthService implements OnDestroy {
    private user: User;
    userSub: Subscription;
    autValidation = new Subject<boolean>();
    private isAuthenticated = false;
    constructor(private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UiService,
        private store: Store<{ui: formApp.State}>) { }
    registerUser(authData: AuthData) {
        this.uiService.progressBarr.next(false);
        this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.uiService.progressBarr.next(true);
        }).catch(error => {
            this.uiService.progressBarr.next(true);
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }
    // Univarsal setup for login or log out button

    authLoginLogout() {
        // To get user Id
        // this.afAuth.idToken.subscribe(
        //     //  id => console.log(id)
        // );
        this.userSub = this.afAuth.user.subscribe(
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
        this.store.dispatch({type: 'START_LOADING'});
       // this.uiService.progressBarr.next(false);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
            this.store.dispatch({type: 'STOP_LOADING'});
        }).catch(error => {
            this.store.dispatch({type: 'STOP_LOADING'});
            this.uiService.showSnackBar(error.message, null, 3000);
        });
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
    ngOnDestroy() {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
    }
}

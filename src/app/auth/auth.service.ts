import { AuthData } from './auth-data.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shaired/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shaired/ui.action';
import * as AUTH from '../auth.action';
@Injectable()
export class AuthService implements OnDestroy {
    userSub: Subscription;
    autValidation = new Subject<boolean>();
    constructor(private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UiService,
        private store: Store<fromRoot.State>) { }
    registerUser(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.store.dispatch(new UI.StopLoading());
        }).catch(error => {
            this.uiService.showSnackBar(error.message, null, 3000);
            this.store.dispatch(new UI.StopLoading());
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
                    this.store.dispatch(new AUTH.Authenticated());
                    this.router.navigate(['/training']);
                } else {
                    this.trainingService.fbUnsubscribe();
                    this.store.dispatch(new AUTH.Unauthenticated());
                    this.router.navigate(['/login']);
                }
            }
        );
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
       // this.uiService.progressBarr.next(false);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
            this.store.dispatch(new UI.StopLoading());
        }).catch(error => {
            this.store.dispatch(new UI.StopLoading());
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

    ngOnDestroy() {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
    }
}

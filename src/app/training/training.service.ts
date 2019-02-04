import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { UiService } from '../shaired/ui.service';

@Injectable()
export class TrainingService {
    execriseChanged = new Subject<any>();
    private userUuid;
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private fbSubscription: Subscription[] = [];
    private availableExcercises: Exercise[];
    private runningExercise: Exercise;
    constructor(private db: AngularFirestore , private afAuth: AngularFireAuth, private uiServices: UiService) { }
    fetchAvailableExcercise() {
       this.uiServices.progressBarr.next(false);
       this.fbSubscription.push(this.db.collection('availableExercises').snapshotChanges()
            .pipe(map(
                (docArray) => {
                   return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                   };
                });
                })).subscribe(
                (result: Exercise[]) => {
                    this.uiServices.progressBarr.next(true);
                    this.availableExcercises = result;
                    this.exercisesChanged.next([...result]);
            }, (error) => {
                this.uiServices.progressBarr.next(true);
                this.uiServices.showSnackBar('Fetching Excercise failed, please try again later', null, 3000);
    }));
    }
    startExercise(selectedId: string) {
        this.runningExercise = this.availableExcercises.find(ex => ex.id === selectedId);
        this.execriseChanged.next({ ...this.runningExercise });
        this.authUser();
    }

    completeExercise() {
        this.addDatatoDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed',
            uuid: this.userUuid
        });
        this.runningExercise = null;
        this.execriseChanged.next(null);
    }
    cancleExercise(progress: number) {
        this.addDatatoDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            uuid: this.userUuid,
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.execriseChanged.next(null);
    }
    getRunningExercise() {
        return { ...this.runningExercise };
    }
    fbUnsubscribe() {
        this.fbSubscription.forEach(sub => sub.unsubscribe());
    }
    fetchExercisesCompleteDetails() {
        this.authUser();
       this.fbSubscription.push(this.db.collection('finishedExercise').valueChanges().subscribe(
            (exercise: Exercise[]) => {
              const userExercise = exercise.filter(el => el.uuid === this.userUuid);
                this.finishedExercisesChanged.next(userExercise);
           }, (error) => {
               this.uiServices.showSnackBar('Fetching Excercise failed, please try again later', null, 3000);
           }
        ));
    }
    private addDatatoDatabase(exercise: Exercise) {
        this.db.collection('finishedExercise').add(exercise);
    }
    authUser() {
        this.afAuth.authState.subscribe(
            (user) => {
                if (user) {
                    this.userUuid = user.uid;
                }
              }
        );
    }
}

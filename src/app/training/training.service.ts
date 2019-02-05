import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { UiService } from '../shaired/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as Training from './training.action';
@Injectable()
export class TrainingService {
    execriseChanged = new Subject<any>();
    private userUuid;
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private fbSubscription: Subscription[] = [];
    private availableExcercises: Exercise[];
    private runningExercise: Exercise;
    constructor(private db: AngularFirestore,
        private afAuth: AngularFireAuth,
        private uiServices: UiService,
        private store: Store<fromTraining.State>
    ) { }
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
                        this.store.dispatch(new Training.SetAvailableTraining(result));
                    }, (error) => {
                        this.uiServices.progressBarr.next(true);
                        this.uiServices.showSnackBar('Fetching Excercise failed, please try again later', null, 3000);
                    }));
    }
    startExercise(selectedId: string) {
       // this.runningExercise = this.availableExcercises.find(ex => ex.id === selectedId);
        this.store.dispatch(new Training.StartTraining(selectedId));
        // this.execriseChanged.next({ ...this.runningExercise });
        this.authUser();
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveTrainings).pipe(take(1)).subscribe(
            ex => {
                this.addDatatoDatabase({
                    ...ex,
                    date: new Date(),
                    uuid: this.userUuid,
                    state: 'completed'
                });
            });
        this.store.dispatch(new Training.StopTraining());
    }
    cancleExercise(progress: number) {
        this.store.select(fromTraining.getActiveTrainings).pipe(take(1)).subscribe(
            ex => {
                this.addDatatoDatabase({
                    ...ex,
                    duration: ex.duration * (progress / 100),
                    calories: ex.calories * (progress / 100),
                    date: new Date(),
                    uuid: this.userUuid,
                    state: 'cancelled'
                });
            });
        this.store.dispatch(new Training.StopTraining());
        // this.runningExercise = null;
        // this.execriseChanged.next(null);
    }
    fbUnsubscribe() {
        this.fbSubscription.forEach(sub => sub.unsubscribe());
    }
    fetchExercisesCompleteDetails() {
        this.authUser();
        this.fbSubscription.push(this.db.collection('finishedExercise').valueChanges().subscribe(
            (exercise: Exercise[]) => {
                const userExercise = exercise.filter(el => el.uuid === this.userUuid);
                this.store.dispatch(new Training.SetFininshedTraining(userExercise));
                // this.finishedExercisesChanged.next(userExercise);
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

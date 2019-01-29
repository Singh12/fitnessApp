import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class TrainingService {
    execriseChanged = new Subject<any>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
   private availableExcercises: Exercise[];
    private runningExercise: Exercise;
    constructor(private db: AngularFirestore) {}
    fetchAvailableExcercise() {
        this.db.collection('availableExercises').snapshotChanges()
            .pipe(map(
                (docArray) => docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                })
            )).subscribe(
                (result: Exercise[]) => {
                  this.availableExcercises = result;
                    this.exercisesChanged.next([...result]);
                }
        );
    }
    startExercise(selectedId: string) {
        this.runningExercise = this.availableExcercises.find(ex => ex.id === selectedId);
        this.execriseChanged.next({...this.runningExercise});
    }
    completeExercise() {
        this.addDatatoDatabase({ ...this.runningExercise,
        date: new Date(),
        state: 'completed'
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
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.execriseChanged.next(null);
    }
    getRunningExercise() {
        return { ...this.runningExercise };
    }
    fetchExercisesCompleteDetails() {
        this.db.collection('finishedExercise').valueChanges().subscribe(
            (exercise: Exercise[]) => {
                this.finishedExercisesChanged.next(exercise);
            });
    }
    private addDatatoDatabase(exercise: Exercise) {
        this.db.collection('finishedExercise').add(exercise);
    }
}

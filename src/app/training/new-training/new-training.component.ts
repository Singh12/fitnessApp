import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Form, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  getListOfExercise: Exercise[];
  exerciseSubscription: Subscription;
  constructor(private getExercise: TrainingService) { }

  ngOnInit() {
    this.getExercise.fetchAvailableExcercise();
    this.exerciseSubscription = this.getExercise.exercisesChanged.subscribe(
      (exercise)  => {
        this.getListOfExercise = exercise;
    }
    );
  }
  onTrainingStart(form: NgForm) {
    this.getExercise.startExercise(form.value.exerciseVlaue);
  }
  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}

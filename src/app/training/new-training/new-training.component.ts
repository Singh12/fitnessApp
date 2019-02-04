import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Form, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UiService } from '../../shaired/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  getListOfExercise: Exercise[];
  exerciseSubscription: Subscription;
  public loadingBar = true;
  loadSubs: Subscription;
  constructor(private getExercise: TrainingService, private uiService: UiService) { }

  ngOnInit() {
    this.loadSubs = this.uiService.progressBarr.subscribe(
      (progress) => this.loadingBar = progress
    );
    this.fetchExcercise();
    this.exerciseSubscription = this.getExercise.exercisesChanged.subscribe(
      (exercise)  => {
        this.getListOfExercise = exercise;
    }
    );
  }
  fetchExcercise() {
    this.getExercise.fetchAvailableExcercise();
  }
  onTrainingStart(form: NgForm) {
    this.getExercise.startExercise(form.value.exerciseVlaue);
  }
  ngOnDestroy() {
    if (this.loadSubs) {
      this.loadSubs.unsubscribe();
    }
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
onGoingTrainig = false;
exerciseSubscription: Subscription;
  constructor(private getExercise: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.getExercise.execriseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.onGoingTrainig = true;
        } else {
          this.onGoingTrainig = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}

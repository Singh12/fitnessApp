import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription, Observable } from 'rxjs';
import * as fromTraining from './training.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
onGoingTrainig: Observable<boolean>;
  constructor(private getExercise: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.onGoingTrainig =  this.store.select(fromTraining.getIsTraining);
    // this.exerciseSubscription = this.getExercise.execriseChanged.subscribe(
    //   exercise => {
    //     if (exercise) {
    //       this.onGoingTrainig = true;
    //     } else {
    //       this.onGoingTrainig = false;
    //     }
    //   }
    // );
  }
}

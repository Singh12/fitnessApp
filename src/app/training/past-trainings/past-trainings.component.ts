import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) showFirstLastButtons: MatPaginator;
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exchangedSubscription: Subscription;
  constructor(private passedTrainingData: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
   this.store.select(fromTraining.getFinishedExercise).subscribe(
     ex => this.dataSource.data = ex
   );
    this.passedTrainingData.fetchExercisesCompleteDetails();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.showFirstLastButtons;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnDestroy() {
    if (this.exchangedSubscription) {
      this.exchangedSubscription.unsubscribe();
    }
  }
}

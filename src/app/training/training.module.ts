import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { StoreModule } from '@ngrx/store';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.comopnent';
import { ShairdModule } from '../shaired/shaired.module';
import { TrainingRoutingModule } from './training-routing.module';
import { trainingReducer } from './training.reducer';
@NgModule({
    declarations: [TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent],
    imports: [
        ShairdModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {
}

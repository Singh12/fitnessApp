import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.comopnent';
import { ShairdModule } from '../shaired/shaired.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
    declarations: [TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent],
    imports: [
        ShairdModule,
        TrainingRoutingModule,
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {
}

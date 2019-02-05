import { Action } from '@ngrx/store';
import { Exercise } from '../training/exercise.model';


export const SET_AVAILABLE_TRAINING = '[training]: Available training';
export const SET_FINISHED_TRAINING = '[training]: Fininshed Training';
export const START_TRAINING = '[training]: Statrt Training';
export const STOP_TRAINING = '[training]: Stop Training';

export class SetAvailableTraining implements Action {
    readonly type = SET_AVAILABLE_TRAINING;
    constructor(public payload: Exercise[]) {}
}

export class SetFininshedTraining implements Action {
    readonly type = SET_FINISHED_TRAINING;
    constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
    readonly type = START_TRAINING;
    constructor(public payload: string) {}
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableTraining | SetFininshedTraining | StartTraining | StopTraining;

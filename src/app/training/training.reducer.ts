
import { TrainingActions, SET_AVAILABLE_TRAINING, SET_FINISHED_TRAINING, START_TRAINING, STOP_TRAINING } from './training.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Exercise } from './exercise.model';
export interface TrainingState {
    availableExercise: Exercise[];
    finishedExercise: Exercise[];
    activeTraining: Exercise;
}

export interface State extends fromRoot.State {
    trainigState: TrainingState;
}

const initialState: TrainingState = {
    availableExercise: [],
    finishedExercise: [],
    activeTraining: null
};



export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAINING:
       // console.log(SET_AVAILABLE_TRAINING, state);
         return {
             ...state,
            availableExercise: action.payload
         };
         case SET_FINISHED_TRAINING:
         return {
            ...state,
            finishedExercise: action.payload
         };
         case START_TRAINING:
         return {
            ...state,
            activeTraining: { ...state.availableExercise.find(ex => ex.id === action.payload) }
         };
         case STOP_TRAINING:
         return {
            ...state,
            activeTraining: null
         };
         default:
         return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercise = createSelector(getTrainingState, (state: TrainingState) => state.availableExercise);
export const getFinishedExercise = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercise);
export const getActiveTrainings = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shaired/ui.reducer';


export interface State {
   isLoading: fromUi.State;
}

export const reducres: ActionReducerMap<State> = {
   ui: fromUi.uiReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');

export const getisLoading = createSelector(getUiState, fromUi.getIsLoading);

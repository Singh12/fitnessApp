import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shaired/ui.reducer';
import * as fromAuth from './auth.recucer';

export interface State {
   isLoading: fromUi.State;
   isAuthenticated: fromAuth.State;
}

export const reducres: ActionReducerMap<State> = {
   ui: fromUi.uiReducer,
   auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');

export const getisLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthenticated = createFeatureSelector<fromAuth.State>('auth');

export const getIsauthenticated = createSelector(getAuthenticated, fromAuth.isAuthenticated);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

// انتخاب کل appState
export const selectAppState = createFeatureSelector<AppState>('appState');

// انتخاب token
export const selectToken = createSelector(
  selectAppState,
  (state: AppState) => state.token
);

// انتخاب user
export const selectUser = createSelector(
  selectAppState,
  (state: AppState) => state.user
);

// انتخاب repositories
export const selectRepositories = createSelector(
  selectAppState,
  (state: AppState) => state.repositories
);

// انتخاب error
export const selectError = createSelector(
  selectAppState,
  (state: AppState) => state.error
);


export const selectLoading = createSelector(
    selectAppState,
    (state: AppState) => state.loading
);
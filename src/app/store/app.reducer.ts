import { createReducer, on } from '@ngrx/store';
import { clearToken, loadRepositories, loadRepositoriesFailure, loadRepositoriesSuccess, login, logout, setUser } from './app.action';
import { AppState } from './app.state';

export const initialState: AppState = {
  token: null,
  user: null,
  repositories: [],
  error: null,
  loading: null,
};

export const appReducer = createReducer(
  initialState,
  on(login, (state, { token }) => ({ ...state, token })),
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, token: null, user: null })),
  on(clearToken, () => ({ ...initialState })),
  on(loadRepositories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadRepositoriesSuccess, (state, { repositories }) => ({
    ...state,
    loading:false,
    repositories,
  })),
  on(loadRepositoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

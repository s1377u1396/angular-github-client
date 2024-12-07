import {createAction , props} from '@ngrx/store';
import { User } from '../models/user.model';
import { Repository } from '../models/repository.model';
export const login = createAction(
    '[Auth] Login',
    props<{token: string}>()
);

export const setUser = createAction(
    '[Auth] Set User',
    props<{user: User}>()
);

export const logout = createAction(
    '[Auth] Logout'
);

export const clearToken = createAction(
    '[Auth] Clear Token'
);

export const loadRepositories = createAction(
    '[Repository] Load Repositories'
);

export const loadRepositoriesSuccess = createAction(
    '[Repository] Load Repositories Sucess',
    props<{repositories: Repository[]}>()
);

export const loadRepositoriesFailure = createAction(
    '[Repository] Load Repositories Failure',
    props<{error: any}>()
);
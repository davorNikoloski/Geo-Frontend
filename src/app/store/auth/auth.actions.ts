import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ 
    user: User; 
    access_token: string; 
    refresh_token: string 
  }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ 
    username: string; 
    email: string; 
    password: string;
    firstname: string;
    lastname: string;
  }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const refreshToken = createAction('[Auth] Refresh Token');

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ access_token: string }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: string }>()
);

export const restoreAuthState = createAction(
  '[Auth] Restore Auth State',
  props<{ user: User | null; access_token: string; refresh_token: string }>()
);

export const restoreAuthStateSuccess = createAction(
  '[Auth] Restore Auth State Success',
  props<{ user: User; access_token: string; refresh_token: string }>()
);

export const restoreAuthStateFailure = createAction(
  '[Auth] Restore Auth State Failure',
  props<{ error: string }>()
);
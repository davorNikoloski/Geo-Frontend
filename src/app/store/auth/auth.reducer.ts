import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialState,
  
  // Login
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(AuthActions.loginSuccess, (state, { user, access_token, refresh_token }) => ({
    ...state,
    user,
    token: access_token,
    refreshToken: refresh_token,
    loading: false,
    error: null
  })),
  
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Register
  on(AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
  
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Logout
  on(AuthActions.logout, () => initialState),
  
  // Refresh Token
  on(AuthActions.refreshToken, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(AuthActions.refreshTokenSuccess, (state, { access_token }) => ({
    ...state,
    token: access_token,
    loading: false,
    error: null
  })),
  
  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Restore Auth State
  on(AuthActions.restoreAuthState, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.restoreAuthStateSuccess, (state, { user, access_token, refresh_token }) => ({
    ...state,
    user,
    token: access_token,
    refreshToken: refresh_token,
    loading: false,
    error: null
  })),

  on(AuthActions.restoreAuthStateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
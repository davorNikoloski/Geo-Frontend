import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { usageReducer } from './usage/usage.reducer';
import { UsageState } from './usage/usage.state';
import { ApiKeyState } from './apiKey/apiKey.state';
import { apiKeyReducer } from './apiKey/apiKey.reducer';

export interface AppState {
  auth: AuthState;
  usage: UsageState;
  apiKey: ApiKeyState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  usage: usageReducer,
  apiKey: apiKeyReducer
};
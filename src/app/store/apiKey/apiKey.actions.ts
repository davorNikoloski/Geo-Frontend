import { createAction, props } from '@ngrx/store';
import { ApiKey } from './apiKey.model';

// Create API Key
export const createApiKey = createAction(
  '[API Key] Create API Key',
  props<{ 
    userId: number;
    name: string;
    expiresInDays?: number;
    permissions: number[];
  }>()
);

export const createApiKeySuccess = createAction(
  '[API Key] Create API Key Success',
  props<{ apiKey: ApiKey }>()
);

export const createApiKeyFailure = createAction(
  '[API Key] Create API Key Failure',
  props<{ error: string }>()
);

// Load User API Keys
export const loadUserApiKeys = createAction(
  '[API Key] Load User API Keys',
  props<{ userId: number }>()
);

export const loadUserApiKeysSuccess = createAction(
  '[API Key] Load User API Keys Success',
  props<{ apiKeys: ApiKey[] }>()
);

export const loadUserApiKeysFailure = createAction(
  '[API Key] Load User API Keys Failure',
  props<{ error: string }>()
);

// Update API Key
export const updateApiKey = createAction(
  '[API Key] Update API Key',
  props<{ 
    keyId: number;
    updateData: Partial<ApiKey>;
  }>()
);

export const updateApiKeySuccess = createAction(
  '[API Key] Update API Key Success',
  props<{ apiKey: ApiKey }>()
);

export const updateApiKeyFailure = createAction(
  '[API Key] Update API Key Failure',
  props<{ error: string }>()
);

// Delete API Key
export const deleteApiKey = createAction(
  '[API Key] Delete API Key',
  props<{ keyId: number }>()
);

export const deleteApiKeySuccess = createAction(
  '[API Key] Delete API Key Success',
  props<{ keyId: number }>()
);

export const deleteApiKeyFailure = createAction(
  '[API Key] Delete API Key Failure',
  props<{ error: string }>()
);

// Add API Key Permission
export const addApiKeyPermission = createAction(
  '[API Key] Add Permission',
  props<{ 
    keyId: number;
    apiId: number;
  }>()
);

export const addApiKeyPermissionSuccess = createAction(
  '[API Key] Add Permission Success',
  props<{ 
    keyId: number;
    permission: ApiKeyPermission;
  }>()
);

export const addApiKeyPermissionFailure = createAction(
  '[API Key] Add Permission Failure',
  props<{ error: string }>()
);

// Remove API Key Permission
export const removeApiKeyPermission = createAction(
  '[API Key] Remove Permission',
  props<{ 
    keyId: number;
    apiId: number;
  }>()
);

export const removeApiKeyPermissionSuccess = createAction(
  '[API Key] Remove Permission Success',
  props<{ 
    keyId: number;
    apiId: number;
  }>()
);

export const removeApiKeyPermissionFailure = createAction(
  '[API Key] Remove Permission Failure',
  props<{ error: string }>()
);

// Set Selected API Key
export const setSelectedApiKey = createAction(
  '[API Key] Set Selected',
  props<{ apiKey: ApiKey | null }>()
);

// Clear API Key State
export const clearApiKeyState = createAction(
  '[API Key] Clear State'
);

// Clear API Key Error
export const clearApiKeyError = createAction(
  '[API Key] Clear Error'
);

export interface ApiKeyPermission {
  id: number;
  api_id: number;
  created_at: string;
}
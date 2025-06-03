import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApiKeyState } from './apiKey.state';

export const selectApiKeyState = createFeatureSelector<ApiKeyState>('apiKey');

export const selectApiKeys = createSelector(
  selectApiKeyState,
  (state: ApiKeyState) => state.apiKeys
);

export const selectSelectedApiKey = createSelector(
  selectApiKeyState,
  (state: ApiKeyState) => state.selectedApiKey
);

export const selectApiKeyLoading = createSelector(
  selectApiKeyState,
  (state: ApiKeyState) => state.loading
);

export const selectApiKeyError = createSelector(
  selectApiKeyState,
  (state: ApiKeyState) => state.error
);

// Select API keys by user ID
export const selectApiKeysByUserId = (userId: number) => createSelector(
  selectApiKeys,
  (apiKeys) => apiKeys.filter(key => key.user_id === userId)
);

// Select active API keys
export const selectActiveApiKeys = createSelector(
  selectApiKeys,
  (apiKeys) => apiKeys.filter(key => key.is_active)
);

// Select expired API keys
export const selectExpiredApiKeys = createSelector(
  selectApiKeys,
  (apiKeys) => apiKeys.filter(key => {
    if (!key.expires_at) return false;
    return new Date(key.expires_at) < new Date();
  })
);

// Select API key by ID
export const selectApiKeyById = (keyId: number) => createSelector(
  selectApiKeys,
  (apiKeys) => apiKeys.find(key => key.id === keyId)
);

// Select API keys with specific permission
export const selectApiKeysWithPermission = (apiId: number) => createSelector(
  selectApiKeys,
  (apiKeys) => apiKeys.filter(key => 
    key.permissions.some(permission => permission.api_id === apiId)
  )
);

// Count selectors
export const selectTotalApiKeys = createSelector(
  selectApiKeys,
  (apiKeys) => apiKeys.length
);

export const selectActiveApiKeysCount = createSelector(
  selectActiveApiKeys,
  (activeKeys) => activeKeys.length
);

export const selectExpiredApiKeysCount = createSelector(
  selectExpiredApiKeys,
  (expiredKeys) => expiredKeys.length
);

// Check if user has API keys
export const selectHasApiKeys = createSelector(
  selectApiKeys,
  (apiKeys) => apiKeys.length > 0
);

// Check if loading or has error
export const selectApiKeyStatus = createSelector(
  selectApiKeyLoading,
  selectApiKeyError,
  (loading, error) => ({ loading, error })
);
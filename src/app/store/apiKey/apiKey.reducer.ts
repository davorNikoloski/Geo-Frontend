import { createReducer, on } from '@ngrx/store';
import { initialState } from './apiKey.state';
import * as ApiKeyActions from './apiKey.actions';

export const apiKeyReducer = createReducer(
  initialState,
  
  // Create API Key
  on(ApiKeyActions.createApiKey, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ApiKeyActions.createApiKeySuccess, (state, { apiKey }) => ({
    ...state,
    apiKeys: [...state.apiKeys, apiKey],
    loading: false,
    error: null
  })),
  
  on(ApiKeyActions.createApiKeyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Load User API Keys
  on(ApiKeyActions.loadUserApiKeys, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ApiKeyActions.loadUserApiKeysSuccess, (state, { apiKeys }) => ({
    ...state,
    apiKeys,
    loading: false,
    error: null
  })),
  
  on(ApiKeyActions.loadUserApiKeysFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Update API Key
  on(ApiKeyActions.updateApiKey, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ApiKeyActions.updateApiKeySuccess, (state, { apiKey }) => ({
    ...state,
    apiKeys: state.apiKeys.map(key => 
      key.id === apiKey.id ? apiKey : key
    ),
    selectedApiKey: state.selectedApiKey?.id === apiKey.id ? apiKey : state.selectedApiKey,
    loading: false,
    error: null
  })),
  
  on(ApiKeyActions.updateApiKeyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Delete API Key
  on(ApiKeyActions.deleteApiKey, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ApiKeyActions.deleteApiKeySuccess, (state, { keyId }) => ({
    ...state,
    apiKeys: state.apiKeys.filter(key => key.id !== keyId),
    selectedApiKey: state.selectedApiKey?.id === keyId ? null : state.selectedApiKey,
    loading: false,
    error: null
  })),
  
  on(ApiKeyActions.deleteApiKeyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Add API Key Permission
  on(ApiKeyActions.addApiKeyPermission, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ApiKeyActions.addApiKeyPermissionSuccess, (state, { keyId, permission }) => ({
    ...state,
    apiKeys: state.apiKeys.map(key => 
      key.id === keyId 
        ? { ...key, permissions: [...key.permissions, permission] }
        : key
    ),
    selectedApiKey: state.selectedApiKey?.id === keyId 
      ? { ...state.selectedApiKey, permissions: [...state.selectedApiKey.permissions, permission] }
      : state.selectedApiKey,
    loading: false,
    error: null
  })),
  
  on(ApiKeyActions.addApiKeyPermissionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Remove API Key Permission
  on(ApiKeyActions.removeApiKeyPermission, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ApiKeyActions.removeApiKeyPermissionSuccess, (state, { keyId, apiId }) => ({
    ...state,
    apiKeys: state.apiKeys.map(key => 
      key.id === keyId 
        ? { ...key, permissions: key.permissions.filter(p => p.api_id !== apiId) }
        : key
    ),
    selectedApiKey: state.selectedApiKey?.id === keyId 
      ? { ...state.selectedApiKey, permissions: state.selectedApiKey.permissions.filter(p => p.api_id !== apiId) }
      : state.selectedApiKey,
    loading: false,
    error: null
  })),
  
  on(ApiKeyActions.removeApiKeyPermissionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Set Selected API Key
  on(ApiKeyActions.setSelectedApiKey, (state, { apiKey }) => ({
    ...state,
    selectedApiKey: apiKey
  })),
  
  // Clear API Key State
  on(ApiKeyActions.clearApiKeyState, () => initialState),
  
  // Clear API Key Error
  on(ApiKeyActions.clearApiKeyError, state => ({
    ...state,
    error: null
  }))
);
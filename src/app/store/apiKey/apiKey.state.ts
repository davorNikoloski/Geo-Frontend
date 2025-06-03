import { ApiKey } from './apiKey.model';

export interface ApiKeyState {
  apiKeys: ApiKey[];
  selectedApiKey: ApiKey | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ApiKeyState = {
  apiKeys: [],
  selectedApiKey: null,
  loading: false,
  error: null
};
export interface ApiKey {
  id: number;
  user_id: number;
  api_key: string;
  name: string;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  permissions: ApiKeyPermission[];
}

export interface ApiKeyPermission {
  id: number;
  api_id: number;
  created_at: string;
}

export interface CreateApiKeyRequest {
  name: string;
  expires_in_days?: number;
  permissions: number[];
}

export interface UpdateApiKeyRequest {
  name?: string;
  is_active?: boolean;
}

export interface ApiKeyResponse {
  id: number;
  user_id: number;
  api_key: string;
  name: string;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  permissions: ApiKeyPermission[];
}
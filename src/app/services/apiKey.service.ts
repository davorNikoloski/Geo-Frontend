import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiKey, CreateApiKeyRequest, UpdateApiKeyRequest, ApiKeyPermission } from '../store/apiKey/apiKey.model';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createApiKey(userId: number, request: CreateApiKeyRequest, token: string): Observable<ApiKey> {
    return this.http.post<ApiKey>(
      `${this.apiUrl}/api/users/${userId}/keys`,
      {
        name: request.name,
        expires_in_days: request.expires_in_days,
        permissions: request.permissions
      },
      { headers: this.getAuthHeaders(token) }
    );
  }

  getUserApiKeys(userId: number, token: string): Observable<ApiKey[]> {
    return this.http.get<ApiKey[]>(
      `${this.apiUrl}/api/users/${userId}/keys`,
      { headers: this.getAuthHeaders(token) }
    );
  }

  updateApiKey(keyId: number, request: UpdateApiKeyRequest, token: string): Observable<ApiKey> {
    return this.http.put<ApiKey>(
      `${this.apiUrl}/api/keys/${keyId}`,
      request,
      { headers: this.getAuthHeaders(token) }
    );
  }

  deleteApiKey(keyId: number, token: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/api/keys/${keyId}`,
      { headers: this.getAuthHeaders(token) }
    );
  }

  addApiKeyPermission(keyId: number, apiId: number, token: string): Observable<ApiKeyPermission> {
    return this.http.post<ApiKeyPermission>(
      `${this.apiUrl}/api/keys/${keyId}/permissions`,
      { api_id: apiId },
      { headers: this.getAuthHeaders(token) }
    );
  }

  removeApiKeyPermission(keyId: number, apiId: number, token: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/api/keys/${keyId}/permissions/${apiId}`,
      { headers: this.getAuthHeaders(token) }
    );
  }

  validateApiKey(apiKey: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/validate`, { api_key: apiKey });
  }
}
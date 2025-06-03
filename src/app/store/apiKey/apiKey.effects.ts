import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as ApiKeyActions from './apiKey.actions';
import { selectToken } from '../auth/auth.selectors';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiKeyEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store);

  private getAuthHeaders() {
    return this.store.select(selectToken).pipe(
      map(token => ({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      }))
    );
  }

  createApiKey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiKeyActions.createApiKey),
      switchMap(action =>
        this.getAuthHeaders().pipe(
          switchMap(options =>
            this.http.post<any>(`${environment.apiUrl}/api/users/${action.userId}/keys`, {
              name: action.name,
              expires_in_days: action.expiresInDays,
              permissions: action.permissions
            }, options).pipe(
              map(response => ApiKeyActions.createApiKeySuccess({ apiKey: response })),
              catchError(error => of(ApiKeyActions.createApiKeyFailure({ 
                error: error.error?.error || error.message || 'Failed to create API key'
              })))
            )
          )
        )
      )
    )
  );

  loadUserApiKeys$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiKeyActions.loadUserApiKeys),
      switchMap(action =>
        this.getAuthHeaders().pipe(
          switchMap(options =>
            this.http.get<any[]>(`${environment.apiUrl}/api/users/${action.userId}/keys`, options).pipe(
              map(response => ApiKeyActions.loadUserApiKeysSuccess({ apiKeys: response })),
              catchError(error => of(ApiKeyActions.loadUserApiKeysFailure({ 
                error: error.error?.error || error.message || 'Failed to load API keys'
              })))
            )
          )
        )
      )
    )
  );

  updateApiKey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiKeyActions.updateApiKey),
      switchMap(action =>
        this.getAuthHeaders().pipe(
          switchMap(options =>
            this.http.put<any>(`${environment.apiUrl}/api/keys/${action.keyId}`, 
              action.updateData, options).pipe(
              map(response => ApiKeyActions.updateApiKeySuccess({ apiKey: response })),
              catchError(error => of(ApiKeyActions.updateApiKeyFailure({ 
                error: error.error?.error || error.message || 'Failed to update API key'
              })))
            )
          )
        )
      )
    )
  );

  deleteApiKey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiKeyActions.deleteApiKey),
      switchMap(action =>
        this.getAuthHeaders().pipe(
          switchMap(options =>
            this.http.delete(`${environment.apiUrl}/api/keys/${action.keyId}`, options).pipe(
              map(() => ApiKeyActions.deleteApiKeySuccess({ keyId: action.keyId })),
              catchError(error => of(ApiKeyActions.deleteApiKeyFailure({ 
                error: error.error?.error || error.message || 'Failed to delete API key'
              })))
            )
          )
        )
      )
    )
  );

  addApiKeyPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiKeyActions.addApiKeyPermission),
      switchMap(action =>
        this.getAuthHeaders().pipe(
          switchMap(options =>
            this.http.post<any>(`${environment.apiUrl}/api/keys/${action.keyId}/permissions`, {
              api_id: action.apiId
            }, options).pipe(
              map(response => ApiKeyActions.addApiKeyPermissionSuccess({ 
                keyId: action.keyId,
                permission: response 
              })),
              catchError(error => of(ApiKeyActions.addApiKeyPermissionFailure({ 
                error: error.error?.error || error.message || 'Failed to add permission'
              })))
            )
          )
        )
      )
    )
  );

  removeApiKeyPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiKeyActions.removeApiKeyPermission),
      switchMap(action =>
        this.getAuthHeaders().pipe(
          switchMap(options =>
            this.http.delete(`${environment.apiUrl}/api/keys/${action.keyId}/permissions/${action.apiId}`, options).pipe(
              map(() => ApiKeyActions.removeApiKeyPermissionSuccess({ 
                keyId: action.keyId,
                apiId: action.apiId
              })),
              catchError(error => of(ApiKeyActions.removeApiKeyPermissionFailure({ 
                error: error.error?.error || error.message || 'Failed to remove permission'
              })))
            )
          )
        )
      )
    )
  );
}
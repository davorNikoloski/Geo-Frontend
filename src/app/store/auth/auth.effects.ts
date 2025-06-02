import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { isPlatformBrowser } from '@angular/common';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.http.post<any>(`${environment.apiUrl}/api/users/login`, {
          username: action.username,
          password: action.password
        }).pipe(
          map(response => AuthActions.loginSuccess({ 
            user: response.user, 
            access_token: response.access_token, 
            refresh_token: response.refresh_token 
          })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.http.post<any>(`${environment.apiUrl}/api/users`, {
          username: action.username,
          email: action.email,
          password: action.password,
          firstname: action.firstname,
          lastname: action.lastname
        }).pipe(
          map(response => AuthActions.registerSuccess({ user: response })),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() => {
        if (!isPlatformBrowser(this.platformId)) {
          return of(AuthActions.refreshTokenFailure({ error: 'Cannot refresh token on server' }));
        }
        return this.http.post<any>(`${environment.apiUrl}/api/users/refresh`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
          }
        }).pipe(
          map(response => AuthActions.refreshTokenSuccess({ access_token: response.access_token })),
          catchError(error => of(AuthActions.refreshTokenFailure({ error: error.message })))
        );
      })
    )
  );

  restoreAuthState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreAuthState),
      mergeMap(({ access_token, refresh_token }) => {
        if (!isPlatformBrowser(this.platformId)) {
          return of(AuthActions.restoreAuthStateFailure({ error: 'Cannot restore auth state on server' }));
        }
        return this.http.get<any>(`${environment.apiUrl}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }).pipe(
          map(response => AuthActions.restoreAuthStateSuccess({
            user: response.user,
            access_token,
            refresh_token
          })),
          catchError(error => {
            if (error.status === 401 && refresh_token) {
              // Attempt to refresh token
              return this.http.post<any>(`${environment.apiUrl}/api/users/refresh`, {}, {
                headers: {
                  Authorization: `Bearer ${refresh_token}`
                }
              }).pipe(
                mergeMap(response => 
                  this.http.get<any>(`${environment.apiUrl}/api/users/me`, {
                    headers: {
                      Authorization: `Bearer ${response.access_token}`
                    }
                  }).pipe(
                    map(userResponse => AuthActions.restoreAuthStateSuccess({
                      user: userResponse.user,
                      access_token: response.access_token,
                      refresh_token
                    })),
                    catchError(refreshError => of(AuthActions.restoreAuthStateFailure({ error: refreshError.message || 'Failed to restore auth state after refresh' })))
                  )
                ),
                catchError(refreshError => of(AuthActions.restoreAuthStateFailure({ error: refreshError.message || 'Failed to refresh token' })))
              );
            }
            return of(AuthActions.restoreAuthStateFailure({ error: error.message || 'Failed to restore auth state' }));
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user, access_token, refresh_token }) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', access_token);
          localStorage.setItem('refreshToken', refresh_token);
        }
        this.router.navigate(['/']);
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  restoreAuthStateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreAuthStateFailure),
      tap(() => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );
}
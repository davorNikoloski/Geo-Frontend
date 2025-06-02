import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { selectToken } from '../store/auth/auth.selectors';
import { Observable, of } from 'rxjs';
import { switchMap, first, timeout, catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const platformId = inject(PLATFORM_ID);

  // If running on the server (SSR), don't attach token
  if (isPlatformServer(platformId)) {
    return next(req);
  }

  const store = inject(Store<AppState>);

  return store.select(selectToken).pipe(
    timeout(500),
    first(),
    catchError(() => of(null)), // fallback if error occurs
    switchMap(token => {
      if (token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(cloned);
      }
      return next(req);
    })
  );
};

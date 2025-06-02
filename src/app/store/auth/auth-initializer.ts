import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export function authInitializer() {
  const store = inject(Store);
  const platformId = inject(PLATFORM_ID);

  return () => {
    if (isPlatformBrowser(platformId)) {
      const access_token = localStorage.getItem('token');
      const refresh_token = localStorage.getItem('refreshToken');
      if (access_token && refresh_token) {
        store.dispatch(AuthActions.restoreAuthState({ user: null, access_token, refresh_token }));
      }
    }
    return Promise.resolve();
  };
}
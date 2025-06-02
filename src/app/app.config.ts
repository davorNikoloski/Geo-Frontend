import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './store';
import { AuthEffects } from './store/auth/auth.effects';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { environment } from '../environments/environment';
import { APP_INITIALIZER } from '@angular/core';
import { authInitializer } from './store/auth/auth-initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    provideStore(reducers),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    importProvidersFrom([
      // Optional: Global modules like FormsModule or ReactiveFormsModule if needed
    ]),
    {
      provide: APP_INITIALIZER,
      useFactory: authInitializer,
      multi: true
    }
  ]
};
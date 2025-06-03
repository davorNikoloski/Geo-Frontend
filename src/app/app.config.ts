import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './store';
import { AuthEffects } from './store/auth/auth.effects';
import { UsageEffects } from './store/usage/usage.effects';
import { ApiKeyEffects } from './store/apiKey/apiKey.effects';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { environment } from '../environments/environment';
import { APP_INITIALIZER } from '@angular/core';
import { authInitializer } from './store/auth/auth-initializer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    provideStore(reducers),
    provideEffects([AuthEffects, UsageEffects, ApiKeyEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    importProvidersFrom([
      BrowserAnimationsModule, // Add this line for ngx-charts animations
    ]),
    {
      provide: APP_INITIALIZER,
      useFactory: authInitializer,
      multi: true
    }
  ]
};
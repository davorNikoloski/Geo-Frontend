// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Remove any layout wrapping here - just bootstrap AppComponent directly
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
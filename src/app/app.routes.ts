// src/app/routes.ts
import { Routes } from '@angular/router';
//PAGES
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ServicesComponent } from './components/services/services.component';
import { UsageComponent } from './components/usage/usage.component';
import { KeysComponent } from './components/keys/keys.component'; 

//AUTH
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'services', // Add this route
    component: ServicesComponent,
  },
  {
    path: 'usage', // Add route for UsageComponent
    component: UsageComponent,
    canActivate: [authGuard] // Protect with authGuard (assumed, adjust if needed)
  },
  {
    path: 'keys', // Add route for UsageComponent
    component: KeysComponent,
    canActivate: [authGuard] // Protect with authGuard (assumed, adjust if needed)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
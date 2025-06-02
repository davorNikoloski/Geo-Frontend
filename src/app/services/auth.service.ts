import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as AuthActions from '../store/auth/auth.actions';
import { selectIsAuthenticated, selectUser, selectToken } from '../store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<any>;
  token$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.user$ = this.store.select(selectUser);
    this.token$ = this.store.select(selectToken);
  }

  login(username: string, password: string) {
    this.store.dispatch(AuthActions.login({ username, password }));
  }

  register(
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    this.store.dispatch(AuthActions.register({ 
      username, 
      email, 
      password,
      firstname,
      lastname
    }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  refreshToken() {
    this.store.dispatch(AuthActions.refreshToken());
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as fromRegister from './register/register-store/register.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUserCreated: boolean = false;

  constructor(
    private angularAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {}

  registerUser(userName: string, email: string, password: string) {
    this.angularAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const user = response.user;
        if (user) {
          this.isUserCreated = true;
        }
        this.store.dispatch(
          new fromRegister.RegisterUserAction(this.isUserCreated)
        );
      });
  }

  login() {}
}

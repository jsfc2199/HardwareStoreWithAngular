import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as fromRegister from './register/register-store/register.actions';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

import Swal from 'sweetalert2';
import { Auth, getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUserCreated: boolean = false;
  private auth: Auth = inject(Auth)

  constructor(
    private angularAuth: AngularFireAuth,
    private store: Store<AppState>,
    private router: Router
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

        this.router.navigate(['/login']);
      })
      .catch((error) => {});
  }

  isAuth() {
    if (this.auth.currentUser) {
      return true;
    }

    return this.store.select('register').pipe(
      map((state) => {
        this.isUserCreated = state.isUserCreated;
        if (this.isUserCreated == false) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/providers']);
        }
        return this.isUserCreated;
      })
    );
  }

  login(email: string, password: string) {
    this.angularAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          this.router.navigate(['/providers']);
        }
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          Swal.fire({
            icon: 'error',
            title: 'Email or password are incorrect',
          });
          console.log(error);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Email or password are incorrect',
          });
          console.log(error);
        }
      });
  }
}

import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from '../app.reducer';
import * as fromRegister from './register/register-store/register.actions';

import { Auth, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { LogOutAction } from './auth.logout.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUserCreated: boolean = false;
  private auth: Auth = inject(Auth);

  constructor(
    private angularAuth: AngularFireAuth,
    private store: Store<AppState>,
    private router: Router
  ) {}

  private urls = ['/providers', '/products'];
  getUrls(){
    return this.urls
  }

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

  login(email: string, password: string) {
    this.angularAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          this.isUserCreated = true;
          this.store.dispatch(
            new fromRegister.RegisterUserAction(this.isUserCreated)
          );
          localStorage.setItem('isUserCreated', 'true')
          this.router.navigate(['/providers']);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Email or password are incorrect',
        });
      });
  }

  loginWithGoogle() {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();

    this.angularAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user) {
          this.isUserCreated = true;

          this.store.dispatch(
            new fromRegister.RegisterUserAction(this.isUserCreated)
          );
          localStorage.setItem('isUserCreated', 'true')
          this.router.navigate(['/providers']);
        } else {
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Something went worng while login in with google',
        });
      });
  }

  logOut() {

    if (this.auth.currentUser) {
      signOut(this.auth)
        .then(() => {
          console.log('entra al dispatch');
          this.store.dispatch(new LogOutAction(false))
          localStorage.setItem('isUserCreated', 'false')
          this.router.navigate(['/login']);
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Something went worng while login out',
          });
        });
    }
  }
}

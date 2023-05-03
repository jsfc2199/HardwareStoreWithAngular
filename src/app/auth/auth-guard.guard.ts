import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { RegisterUserAction } from './register/register-store/register.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private route: Router,
    private authService: AuthServiceService,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('register').pipe(
      take(1),
      map(() => {
        if (localStorage.getItem('isUserCreated') === 'true') {     
          this.store.subscribe(authState =>{
            if(authState.register.isUserCreated){
              return
            }else{
              this.store.dispatch(new RegisterUserAction(true))
            }
          })
          return true;
        }
        localStorage.setItem('isUserCreated','false')
        return this.route.createUrlTree(['/login']);
      })
    );
  }
}

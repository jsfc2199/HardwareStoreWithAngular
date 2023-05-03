import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {
    window.addEventListener('popstate', () => {
      setTimeout(() => {
        if (!this.isInWhiteListUrls) {
          localStorage.setItem('isUserCreated', 'false');
          this.authService.logOut();
        }
      }, 10);
    });

    window.addEventListener('beforeunload',()=>{
      setTimeout(()=>{
        if(!this.isInWhiteListUrls) {
          localStorage.setItem('isUserCreated', 'false')
        }
      },100)

    })

  }

  private currentUrl = this.router.url;
  private isInWhiteListUrls: boolean = this.authService
    .getUrls()
    .includes(this.currentUrl);


  ngOnInit(): void {

  }
}

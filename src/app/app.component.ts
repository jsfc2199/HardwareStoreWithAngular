import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthServiceService } from './auth/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
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
      }, 100);
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
  private routerEventsSubscription!: Subscription;


  ngOnInit(): void {
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      //checking if a navigation ends
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url; //updating the url with the new url
        this.isInWhiteListUrls = this.authService.getUrls().includes(this.currentUrl); //checks if the new urls still in the whitelist to keep or logout the user
      }
    });
  }

  ngOnDestroy(): void {
    if(this.routerEventsSubscription){
      this.routerEventsSubscription.unsubscribe()
    }
  }
}

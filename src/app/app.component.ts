import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthServiceService, private router: Router) {
    window.addEventListener('popstate', () => {
      const currentUrl = this.router.url;
      if (!this.authService.getUrls().includes(currentUrl)) {
        this.authService.logOut();
      }
    });
  }
}

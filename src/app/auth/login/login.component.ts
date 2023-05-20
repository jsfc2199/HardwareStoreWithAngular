import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthServiceService) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onLogin() {  
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.get('email')!.value,
        this.loginForm.get('password')!.value
      );
    }
  }

  logingWithGoole(){
    this.authService.loginWithGoogle()
  }
}

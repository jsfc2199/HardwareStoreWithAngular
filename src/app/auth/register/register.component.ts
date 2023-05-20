import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      repeatedPassword: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {

    if (
      this.registerForm.get('password')!.value !=
      this.registerForm.get('repeatedPassword')!.value
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Passwords are not the same',
      });
    }

    this.authService.registerUser(
      this.registerForm.get('fullName')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm.get('password')!.value
    );

    Swal.fire({
      icon: 'success',
      title: 'User Created. Now you can Login',
    });

    this.registerForm.reset()
  }
}

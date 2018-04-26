import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  account = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
  };
  loading = false;
  error = '';
  constructor(
      private authService: AuthService,
      private router: Router,
  ) { }

  ngOnInit() {
    if (this.authService.user) {
        this.router.navigate(['/']);
    }
  }

  register() {
    this.loading = true;
    this.authService.register(this.account)
        .subscribe(isSuccess => {
          if (isSuccess) {
            this.router.navigate(['/login']);
          } else {
            this.error = 'please fix all the errors before submitting';
          }
        });
  }

}

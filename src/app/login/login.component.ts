import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error = '';
  creds: any = {};

  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.loading = true;
    this.authService.authenticate(this.creds.email, this.creds.password)
        .subscribe(result => {
          console.log(result);
          if(result === true) {
            this.router.navigate(['/users']);
          } else {
            this.error = 'username or password incorrect';
            this.loading = false;
          }
        });
  }

}

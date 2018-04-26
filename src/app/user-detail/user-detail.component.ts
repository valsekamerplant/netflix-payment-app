import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  maxExtend = Array.from(new Array(environment.maxExtend), (x, i) => i + 1);
  extendFor: number;
  isLoggedIn = false;
  formatedDate = moment().format('MMMM Do YYYY');

  constructor(
      private route: ActivatedRoute,
      private authService: AuthService,
      private userService: UserService,
      private location: Location
  ) {
    if( this.authService.token) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.getUser();
  }

  save(): void {
    const startdate = moment(this.user.expireDate).diff(moment()) < 0 ? moment() : this.user.expireDate;
    const extention = moment(startdate).add(this.extendFor, 'M');
    this.user.expireDate = extention;
    this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
        .subscribe( (user) => {
          this.user = user;
          this.formatedDate = moment(this.user.expireDate).format('MMMM Do YYYY');
        });
  }

  goBack(): void {
    window.history.back();
  }
}

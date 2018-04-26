import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/User';
import { AuthService} from '../services/auth.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser;
  maxUsers = environment.maxUsers;
  maxExtend = Array.from(new Array(environment.maxExtend), (x, i) => i + 1);
  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.newUser.expireDate = moment().add(this.newUser.expireDate, 'M');
    this.userService.addUser(this.newUser)
        .subscribe(users => this.users = users);
  }

  constructor(
      private userService: UserService,
      private authService: AuthService,
  ) {
    this.newUser  = {
      name: 'name',
      expireDate: moment(),
      owner: authService.user,
    };
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
        .subscribe(users => this.users = users);
  }

  removeUser(id) {
    this.userService.removeUser(id)
        .subscribe( users => this.users = users);
  }

}

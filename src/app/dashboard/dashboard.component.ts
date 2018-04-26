import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { UserService} from '../services/user.service';
import { User} from '../model/User';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    users: User[] = [];
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
        .subscribe(users => this.users = users.filter(this.isAlmostExpired));
  }

  isAlmostExpired (user) {
    return ((moment(user.expireDate).diff(moment()) < 0 || moment(user.expireDate).diff(moment().add(1, 'M')) < 0) && !user.isOwner);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnInit {
  @Input() endDate: any;
  timeLeft: any;
  constructor() { }

  ngOnInit() {
    this.endDate = moment(this.endDate);
    this.getTimeLeft();
  }

  getTimeLeft(): any {
    const expireDate =  moment.duration(this.endDate.diff(moment()));
    this.timeLeft = expireDate;
  }
}

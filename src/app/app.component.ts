import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Frontend Challenge - Johanna Blom';

  // Title of event
  public eventTitle: string = '';
  titleEvent(event: any) {
    this.eventTitle = event.target.value;
  }

  // Date of event
  private subscription!: Subscription;

  private milliSecondsEvent = 0;
  public timeToEvent: string = '';

  calculateTimeToEvent() {
    let milliSecondsNow = Date.now();

    const diff = (this.milliSecondsEvent - milliSecondsNow) / 1000;
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = Math.floor(diff % 60);
    return { days, hours, minutes, seconds };
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value !== null) {
      this.milliSecondsEvent = Date.UTC(
        event.value.getFullYear(),
        event.value.getMonth(),
        event.value.getDate(),
        event.value.getHours(),
        event.value.getMinutes(),
        event.value.getSeconds()
      );
    }

    // TODO: check if this can be in ngOnInit
    // let { days, hours, minutes, seconds } =
    // this.calculateTimeToEvent();
    // this.timeToEvent = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

    setInterval(() => {
      let { days, hours, minutes, seconds } = this.calculateTimeToEvent();
      this.timeToEvent = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
    }, 1);
  }

  ngOnInit(): void {
    // every second
    this.subscription = interval(60000).subscribe(() => {
      this.calculateTimeToEvent();
      console.log(this.calculateTimeToEvent());
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

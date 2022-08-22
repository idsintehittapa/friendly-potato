import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-friendly-potato';

  eventTitle: string = '';
  titleEvent(event: any) {
    this.eventTitle = event.target.value;
  }
}

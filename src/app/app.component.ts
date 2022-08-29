import { Component, OnInit } from '@angular/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Frontend Challenge - Johanna Blom'

  // Title of event

  private fontSize: number = 80
  public eventTitle: any = ''
  public textLength: any

  titleEvent(event: any) {
    this.eventTitle = event.target.value
    let textLength = this.eventTitle.length
    console.log(textLength)

    if (textLength < 5) {
      this.titleSize = {
        'font-size': 80,
      }
    } else if (textLength < 10) {
      this.titleSize = {
        'font-size': 60,
      }
    } else if (textLength < 15) {
      this.titleSize = {
        'font-size': 50,
      }
    } else if (textLength < 20) {
      this.titleSize = {
        'font-size': 40,
      }
    } else {
      this.titleSize = {
        'font-size': 20,
      }

      return
    }

    return localStorage.setItem('event_title', this.eventTitle)
  }

  public titleSize = {
    'font-size': this.fontSize,
  }

  private getTitleEvent(): any {
    this.eventTitle = localStorage.getItem('event_title')
  }

  // Date of event

  private milliSecondsEvent = 0
  public timeToEvent: string = ''

  calculateTimeToEvent() {
    let milliSecondsNow = Date.now()

    const diff = (this.milliSecondsEvent - milliSecondsNow) / 1000
    const days = Math.floor(diff / 86400)
    const hours = Math.floor((diff % 86400) / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    const seconds = Math.floor(diff % 60)
    return { days, hours, minutes, seconds }
  }

  addEvent(type: any, event: MatDatepickerInputEvent<Date>) {
    if (event.value !== null) {
      this.milliSecondsEvent = Date.UTC(
        event.value.getFullYear(),
        event.value.getMonth(),
        event.value.getDate(),
        event.value.getHours(),
        event.value.getMinutes(),
        event.value.getSeconds(),
      )
    }

    setInterval(() => {
      let { days, hours, minutes, seconds } = this.calculateTimeToEvent()
      this.timeToEvent = `${days} days, ${hours}h, ${minutes}m, ${seconds}s`
      return localStorage.setItem('time_to_event', this.timeToEvent)
    }, 1)
  }

  private getTimeToEvent(): any {
    this.timeToEvent = localStorage.getItem('time_to_event') || ''
  }

  ngOnInit(): void {
    this.getTitleEvent()
    this.getTimeToEvent()
  }
}

import {Collector} from "../collector";
import {Collect} from "../collector";
import {TClick, Trace} from "../trace";
import {fromEvent, Observable} from "rxjs";

export abstract class BrowserAdapter implements Collect {
  private readonly collector: Collector;
  window: Window;
  clickEvent: Observable<Event>

  constructor(window: Window, collector: Collector) {
    this.window = window;
    this.collector = collector
    this.clickEvent = fromEvent(this.window, 'click')
  }

  collect(data: Trace): void {
    this.window.navigator.geolocation.getCurrentPosition((position) => {
        data.position = {
          heading: position.coords.heading,
          speed: position.coords.speed,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy
        }
        this.collector.collect(data);
      }, (error) => {
        this.collector.collect(data);
      },
      {
        enableHighAccuracy: true,
      }
    )
  }

  linkStart(): void {
    this.clickEvent.subscribe((event: Event) => {
      this.collect({
        ...this.handleClickEvent(event),
        tags: ["event", "click"],
      })
    })
  }

  abstract handleClickEvent(event: Event): Trace<TClick>;

}

import { Collector } from "../collector";
import { Collect } from "../collector";
import { CollectingClicks } from "../service";
import { CollectingClicksAdapter } from "../service/impl/collecting-clicks.adapter";
import { TClick, Trace } from "../trace";
import { fromEvent, Observable } from "rxjs";

export abstract class BrowserAdapter implements Collect, CollectingClicks {
  private readonly collector: Collector;
  window: Window;
  clickEvent: Observable<Event>;

  constructor(window: Window, collector: Collector) {
    this.window = window;
    this.collector = collector;
    this.clickEvent = fromEvent(this.window, "click");
  }

  collect(data: Trace): void {
    this.window.navigator.geolocation.getCurrentPosition(
      (position) => {
        data.position = {
          heading: position.coords.heading,
          speed: position.coords.speed,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
        };
        this.collector.collect(data);
      },
      (_) => {
        this.collector.collect(data);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }

  linkStart(): void {
    this.clickEvent.subscribe((event: Event) => {
      const data = this.collectingClicks(event);
      if (data) {
        this.collect({
          ...data,
          tags: ["event", "click"],
        });
      }
    });
  }

  collectingClicks(event: Event): Trace<TClick> | undefined {
    return CollectingClicksAdapter.create().collectingClicks(event);
  }
}

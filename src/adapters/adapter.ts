import { CollectorStrategy, WorkerCollector } from "../collector";
import { TClick, Trace } from "../trace";
import { fromEvent, Observable, Subject, takeUntil } from "rxjs";
import {
  AdapterCollectingClicks,
  CollectingClicks,
  CollectingClicksStrategy,
} from "./service";
import { AdapterCollector, TracingStrategy } from "./types";

export abstract class BrowserAdapter
  implements AdapterCollector, CollectingClicks
{
  window: Window;
  strategy: TracingStrategy;
  clickEvent: Observable<Event>;
  destroy$: Subject<any> = new Subject();

  constructor(window: Window, strategy?: TracingStrategy) {
    this.window = window;
    this.clickEvent = fromEvent(this.window, "click").pipe(
      takeUntil(this.destroy$)
    );
    if (strategy) {
      this.strategy = strategy;
    } else {
      this.strategy = {
        collectorStrategy: WorkerCollector.create(),
        collectingClicksStrategy: AdapterCollectingClicks.create(),
      };
    }
    this.window.addEventListener("unload", () => {
      this.destroy$.complete();
    });
  }

  collect<T extends Trace>(
    collectorStrategy: CollectorStrategy,
    data: T
  ): void {
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
        collectorStrategy.collect(data);
      },
      (_) => {
        collectorStrategy.collect(data);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }

  start(): void {
    this.clickEvent.subscribe((event: Event) => {
      const data = this.collectingClicks(
        this.strategy.collectingClicksStrategy,
        event
      );
      if (data) {
        this.collect<Trace<TClick>>(this.strategy.collectorStrategy, {
          ...data,
          tags: ["event", "click"],
        });
      }
    });
  }

  collectingClicks(
    collectingClicksStrategy: CollectingClicksStrategy,
    event: Event
  ): Trace<TClick> | undefined {
    return collectingClicksStrategy.collectingClicks(event);
  }
}

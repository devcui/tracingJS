import { CollectorStrategy, WorkerCollector } from "../collector";
import { TClick, Trace, TraceTag, TraceType } from "../trace";
import { fromEvent, Observable, Subject, takeUntil } from "rxjs";
import {
  AdapterCollectingClicks,
  CollectingClicks,
  CollectingClicksStrategy,
} from "./service";
import { AdapterCollector, TracingStrategy } from "./types";
import { Packet, win } from "../utils";

export abstract class BrowserAdapter
  implements AdapterCollector, CollectingClicks
{
  strategy: TracingStrategy;
  clickEvent: Observable<Event>;
  destroy$: Subject<any> = new Subject();

  constructor(strategy?: TracingStrategy) {
    this.clickEvent = fromEvent(win(), "click").pipe(takeUntil(this.destroy$));
    if (strategy) {
      this.strategy = strategy;
    } else {
      this.strategy = {
        collectorStrategy: WorkerCollector.create(),
        collectingClicksStrategy: AdapterCollectingClicks.create(),
      };
    }
    win().addEventListener("unload", () => {
      this.destroy$.complete();
    });
  }

  collect<T extends Trace>(
    collectorStrategy: CollectorStrategy,
    data: T
  ): void {
    win().navigator.geolocation.getCurrentPosition(
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
        this.collect<Trace<TClick>>(
          this.strategy.collectorStrategy,
          Packet.create<TClick>(
            TraceType.Event,
            data,
            TraceTag.Click,
            TraceTag.Event
          )
        );
      }
    });
  }

  collectingClicks(
    collectingClicksStrategy: CollectingClicksStrategy,
    event: Event
  ): TClick | undefined {
    return collectingClicksStrategy.collectingClicks(event);
  }
}

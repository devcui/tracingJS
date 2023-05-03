import UAParser from "ua-parser-js";
import {
  CollectStrategyFactory,
  Collector,
  CollectorFactory,
} from "./collector";
import {
  TraceClick,
  TrackStrategyFactory,
  Tracker,
  TrackerFactory,
} from "./tracker";
import {
  Browser,
  TraceExtra,
  TracePacket,
  TraceType,
  TracingRegistry,
} from "./types";
import { Packet, win } from "./utils";
import { Subject, fromEvent, map, takeUntil } from "rxjs";

export class TracingJS {
  private defaultRegistry: TracingRegistry = {
    default: {
      collector: CollectorFactory.create(
        CollectStrategyFactory.createConsole()
      ),
      clickTracker: TrackerFactory.create<TraceClick>(
        TrackStrategyFactory.createDefaultClick()
      ),
    },
  };

  private registry?: TracingRegistry;
  private extra?: TraceExtra;
  private destory$: Subject<any> = new Subject();
  private get type(): string {
    return (
      UAParser(win().navigator.userAgent).browser.name?.toLocaleLowerCase() ||
      "default"
    );
  }
  private get browser(): Browser {
    if (this.registry && this.registry[this.type]) {
      return this.registry[this.type];
    } else {
      return this.defaultRegistry.default;
    }
  }

  private get collector(): Collector {
    if (this.browser.collector) {
      return this.browser.collector;
    } else {
      return this.defaultRegistry.default.collector!;
    }
  }

  private get clickTracker(): Tracker<TraceClick> {
    if (this.browser.clickTracker) {
      return this.browser.clickTracker;
    } else {
      return this.defaultRegistry.default.clickTracker!;
    }
  }

  constructor(window: any, extra?: TraceExtra, registry?: TracingRegistry) {
    win(window);
    this.extra = extra;
    this.registry = registry;
    this.addDestoryListener();
  }

  public run(): void {
    this.trackEventClick();
    this.traceEventPerformance();
  }

  private trackEventClick(): void {
    fromEvent(win(), "click")
      .pipe(
        takeUntil(this.destory$),
        map((event: Event) => {
          const data = this.clickTracker.track(event);
          if (!data) return undefined;
          return Packet.create<TraceClick>(TraceType.Event, data, this.extra);
        })
      )
      .subscribe((packet: TracePacket<TraceClick> | undefined) => {
        if (packet) {
          this.collector.collect<TraceClick>(packet);
        }
      });
  }

  private traceEventPerformance(): void {}

  private addDestoryListener(): void {
    win().addEventListener("unload", () => {
      this.destory$.complete();
    });
  }
}

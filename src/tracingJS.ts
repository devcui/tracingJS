import UAParser from "ua-parser-js";
import {
  Collector,
  CollectorFactory,
  CollectStrategyFactory,
} from "./collector";
import {
  ClickTrackStrategyFactory,
  EventFetch,
  EventHttp,
  HttpTrackStrategyFactory,
  TraceClick,
  TraceFetch,
  TraceHttp,
  Tracker,
  TrackerFactory,
} from "./tracker";
import {
  Browser,
  TraceExtra,
  TracePacket,
  TraceTag,
  TraceType,
  TracingRegistry,
} from "./types";
import { IGNORE_URL, Packet, replaceAop, VoidFun, win } from "./utils";
import { fromEvent, map, Subject, takeUntil } from "rxjs";

export class TracingJS {
  private defaultRegistry: TracingRegistry = {
    default: {
      collector: CollectorFactory.create(
        CollectStrategyFactory.createConsole()
      ),
      clickTracker: TrackerFactory.create<Event, TraceClick>(
        ClickTrackStrategyFactory.createDefaultClick()
      ),
      httpTracker: TrackerFactory.create(
        HttpTrackStrategyFactory.createDefaultHttp(IGNORE_URL)
      ),
      fetchTracker: TrackerFactory.create(
        HttpTrackStrategyFactory.createDefaultFetch(IGNORE_URL)
      ),
    },
  };

  private registry?: TracingRegistry;
  private extra?: TraceExtra;
  private destroy$: Subject<any> = new Subject();

  private get type(): string {
    return (
      UAParser(win().navigator.userAgent).browser.name?.toLocaleLowerCase() ||
      "default"
    );
  }

  private get browser(): Browser {
    if (this.registry && this.registry[this.type]) {
      return this.registry[this.type];
    } else if (this.registry && this.registry["default"]) {
      return this.registry["default"];
    } else {
      return this.defaultRegistry["default"];
    }
  }

  private get collector(): Collector {
    if (this.browser.collector) {
      return this.browser.collector;
    } else {
      return this.defaultRegistry["default"].collector!;
    }
  }

  private get clickTracker(): Tracker<Event, TraceClick> {
    if (this.browser.clickTracker) {
      return this.browser.clickTracker;
    } else {
      return this.defaultRegistry["default"].clickTracker!;
    }
  }

  private get httpTracker(): Tracker<EventHttp, Promise<TraceHttp | null>> {
    if (this.browser.httpTracker) {
      return this.browser.httpTracker;
    } else {
      return this.defaultRegistry["default"].httpTracker!;
    }
  }

  private get fetchTracker(): Tracker<EventFetch, Promise<TraceFetch | null>> {
    if (this.browser.fetchTracker) {
      return this.browser.fetchTracker;
    } else {
      return this.defaultRegistry["default"].fetchTracker!;
    }
  }

  constructor(extra?: TraceExtra, registry?: TracingRegistry) {
    this.extra = extra;
    this.registry = registry;
    this.addDestroyListener();
  }

  static init(window: Window): void {
    win(window);
  }

  static create(extra?: TraceExtra, registry?: TracingRegistry): TracingJS {
    return new TracingJS(extra, registry);
  }

  public run(): void {
    this.trackEventClick();
    this.traceHttp();
  }

  public handleCustomEvent(e: Event): void {
    const data = this.clickTracker.track(e);
    if (!data) return undefined;
    this.collector.collect<TraceClick>(
      Packet.create<TraceClick>(
        TraceType.EVENT,
        data,
        this.extra,
        TraceTag.CLICK,
        TraceTag.EVENT
      )
    );
  }

  private trackEventClick(): void {
    fromEvent(win(), "click")
      .pipe(
        takeUntil(this.destroy$),
        map((event: Event) => {
          const data = this.clickTracker.track(event);
          if (!data) return undefined;
          return Packet.create<TraceClick>(
            TraceType.EVENT,
            data,
            this.extra,
            TraceTag.CLICK,
            TraceTag.EVENT
          );
        })
      )
      .subscribe((packet: TracePacket<TraceClick> | undefined) => {
        if (packet) {
          this.collector.collect<TraceClick>(packet);
        }
      });
  }

  private traceHttp(): void {
    const point = this;
    if ("XMLHttpRequest" in win()) {
      replaceAop(XMLHttpRequest.prototype, "open", (originalOpen: VoidFun) => {
        return function (this: any, ...args: any[]): void {
          const triggerTime = Date.now();
          originalOpen.apply(this, args);
          point.httpTracker
            .track({ triggerTime: triggerTime, type: "open", xhr: this, args })
            ?.then((data) => {
              if (data) {
                const packet = Packet.create<TraceHttp>(
                  TraceType.HTTP,
                  data,
                  point.extra,
                  TraceTag.EVENT,
                  TraceTag.XHR,
                  TraceTag.XHR_OPEN
                );
                point.collector.collect(packet);
              }
            });
        };
      });
      replaceAop(XMLHttpRequest.prototype, "send", (originalSend: VoidFun) => {
        return function (this: any, ...args: any[]): void {
          const triggerTime = Date.now();
          originalSend.apply(this, args);
          point.httpTracker
            .track({ triggerTime: triggerTime, type: "send", xhr: this, args })
            ?.then((data) => {
              if (data) {
                const packet = Packet.create<TraceHttp>(
                  TraceType.HTTP,
                  data,
                  point.extra,
                  TraceTag.EVENT,
                  TraceTag.XHR,
                  TraceTag.XHR_SEND
                );
                point.collector.collect(packet);
              }
            });
        };
      });
    }
    if ("fetch" in win()) {
      replaceAop(win(), "fetch", (originalFetch: any) => {
        return function (this: any, ...args: any[]): void {
          let triggerTime: number = Date.now();
          return originalFetch
            .apply(win(), args)
            .then()
            .then((res: Response) => {
              point.fetchTracker
                .track({ type: "fetch", res, args, triggerTime: triggerTime })!
                .then((data) => {
                  if (data) {
                    const packet = Packet.create<TraceFetch>(
                      TraceType.HTTP,
                      data,
                      point.extra,
                      TraceTag.EVENT,
                      TraceTag.FETCH
                    );
                    point.collector.collect(packet);
                  }
                });
              return res;
            });
        };
      });
    }
  }

  private addDestroyListener(): void {
    win().addEventListener("unload", () => {
      this.destroy$.complete();
    });
  }
}

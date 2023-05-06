import UAParser from "ua-parser-js";
import {CollectStrategyFactory, Collector, CollectorFactory} from "./collector";
import {TraceClick, TrackStrategyFactory, Tracker, TrackerFactory} from "./tracker";
import {Browser, TraceExtra, TracePacket, TracingRegistry} from "./types";
import {Packet, win} from "./utils";
import {Subject, fromEvent, map, takeUntil} from "rxjs";

export class TracingJS {
    private defaultRegistry: TracingRegistry = {
        default: {
            collector: CollectorFactory.create(CollectStrategyFactory.createConsole()),
            clickTracker: TrackerFactory.create<TraceClick>(TrackStrategyFactory.createDefaultClick()),
        },
    };

    private registry?: TracingRegistry;
    private extra?: TraceExtra;
    private destroy$: Subject<any> = new Subject();

    private get type(): string {
        return (UAParser(win().navigator.userAgent).browser.name?.toLocaleLowerCase() || "default");
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

    private get clickTracker(): Tracker<TraceClick> {
        if (this.browser.clickTracker) {
            return this.browser.clickTracker;
        } else {
            return this.defaultRegistry["default"].clickTracker!;
        }
    }

    constructor(extra?: TraceExtra, registry?: TracingRegistry) {
        this.extra = extra;
        this.registry = registry
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
        this.traceEventPerformance();
    }

    private trackEventClick(): void {
        fromEvent(win(), "click").pipe(takeUntil(this.destroy$), map((event: Event) => {
            const data = this.clickTracker.track(event);
            if (!data) return undefined;
            return Packet.create<TraceClick>(data, this.extra);
        })).subscribe((packet: TracePacket<TraceClick> | undefined) => {
            if (packet) {
                this.collector.collect<TraceClick>(packet);
            }
        });
    }

    private traceEventPerformance(): void {
    }

    private addDestroyListener(): void {
        win().addEventListener("unload", () => {
            this.destroy$.complete();
        });
    }
}

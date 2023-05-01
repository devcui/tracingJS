# tracingJS

tracking user behavior data

# how to use

```ts
import {
  CollectStrategyFactory,
  CollectorFactory,
  TraceClick,
  TracingJS,
  TracingRegistry,
  TrackStrategyFactory,
  TrackerFactory,
} from "../dist/tracingJS/es";

// default func
export function defaultMain() {
  const extra = { username: "dav", userid: "xxx" };
  const tracingJS = new TracingJS(window, extra);
  tracingJS.run();
}

// use registry
export function registryMain() {
  const registry: TracingRegistry = {
    default: {
      collector: CollectorFactory.create(
        CollectStrategyFactory.createConsole()
      ),
      clickTracker: TrackerFactory.create<TraceClick>(
        TrackStrategyFactory.createChromeClick()
      ),
    },
    firefox: {
      collector: CollectorFactory.create(
        CollectStrategyFactory.createConsole()
      ),
      clickTracker: TrackerFactory.create<TraceClick>(
        TrackStrategyFactory.createDefaultClick()
      ),
    },
    // edge hasn't click tracker,so used default.clickTracker
    edge: {
      collector: CollectorFactory.create(
        CollectStrategyFactory.createWorker("./assets/worker.js")
      ),
    },
    // chrome hasn't collector,so used default.collector
    chrome: {
      clickTracker: TrackerFactory.create<TraceClick>(
        TrackStrategyFactory.createChromeClick()
      ),
    },
  };
  const extra = { username: "dav", userid: "xxx" };
  const tracingJS = new TracingJS(window, extra, registry);
  tracingJS.run();
}
```

# impl your own collector and tracker

## collect

```ts
import {
  CollectStrategy,
  CollectStrategyFactory,
  Collector,
  CollectorFactory,
  TracePacket,
} from "../dist/tracingJS/es";

// implements your own strategy
export class MyCollectStrategy implements CollectStrategy {
  private extra: any;
  constructor(extra: any) {
    this.extra = extra;
  }
  collect(data: TracePacket<any>): void {
    console.log("handle my data");
    data["aaa"] = this.extra;
  }
}

// generate your own collector or use default
export class MyCollector extends Collector {
  private myStrategy: CollectStrategy;
  constructor(strategy: CollectStrategy) {
    super(strategy);
    this.myStrategy = strategy;
  }

  override collect<T>(data: TracePacket<T>): void {
    console.log("use strategy function and handle data");
    this.myStrategy.collect(data);
  }
}

// generate your own collector factory or use default
export class MyCollectorFactory extends CollectorFactory {
  static createMyCollector(strategy: CollectStrategy): Collector {
    console.log("do something");
    return new MyCollector(strategy);
  }
}

// generate your own collector strategy factory or use default
export class MyCollectorStrategyFactory extends CollectStrategyFactory {
  static createMyCollectStrategy(extra: any): CollectStrategy {
    return new MyCollectStrategy(extra);
  }
}
```

## tracker

```ts
import {
  TrackStrategy,
  TrackStrategyFactory,
  Tracker,
  TrackerFactory,
} from "../dist/tracingJS/es";

// generate your own tracker or use default
export class MyTracker<T> extends Tracker<T> {
  private mystrategy: TrackStrategy<T>;
  constructor(strategy: TrackStrategy<T>) {
    super(strategy);
    this.mystrategy = strategy;
  }
  track(event: Event): T | undefined {
    return this.mystrategy.track(event);
  }
}

// generate your own tracker factory or use default
export class MyTrackerFactory extends TrackerFactory {
  static createMyTracker<T>(strategy: TrackStrategy<T>): MyTracker<T> {
    return new MyTracker<T>(strategy);
  }
}

// generate your own track strategy or use default
export class MyTrackStrategy implements TrackStrategy<any> {
  constructor() {}
  track(event: Event): any | undefined {
    return {};
  }
}

// generate your own track strategy factory or use default
export class MyTrackStrategyFactory extends TrackStrategyFactory {
  static createMyTrack(): TrackStrategy<any> {
    return new MyTrackStrategy();
  }
}
```

## main

```ts
import { TracingJS, TracingRegistry } from "../dist/tracingJS/es";
import { MyCollectorFactory, MyCollectorStrategyFactory } from "./my-collect";
import { MyTrackStrategyFactory, MyTrackerFactory } from "./my-tracker";

export function myMain() {
  const registry: TracingRegistry = {
    default: {
      collector: MyCollectorFactory.createMyCollector(
        MyCollectorStrategyFactory.createMyCollectStrategy({ say: "ahaha" })
      ),
      clickTracker: MyTrackerFactory.createMyTracker(
        MyTrackStrategyFactory.createMyTrack()
      ),
    },
  };
  const tracingJS = new TracingJS(window, {}, registry);
  tracingJS.run();
}
```

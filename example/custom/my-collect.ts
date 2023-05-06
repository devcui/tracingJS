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

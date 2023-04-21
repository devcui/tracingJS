import { CollectorStrategy } from "../collector";
import { Trace } from "../trace";
import { CollectingClicksStrategy } from "./service";

export interface TracingStrategy {
  collectorStrategy: CollectorStrategy;
  collectingClicksStrategy: CollectingClicksStrategy;
}

export interface AdapterCollector {
  collect<T extends Trace>(collectorStrategy: CollectorStrategy, data: T): void;
}

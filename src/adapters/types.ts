import { CollectorStrategy } from "../collector";
import { Trace } from "../trace";

export interface AdapterCollector {
  collect<T extends Trace>(collectorStrategy: CollectorStrategy, data: T): void;
}

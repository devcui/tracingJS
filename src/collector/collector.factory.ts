import { Collector } from "./collector";
import { SimpleCollector } from "./simple.collector";
import { CollectStrategy } from "./types";

export class CollectorFactory {
  static create(strategy: CollectStrategy): Collector {
    return new SimpleCollector(strategy);
  }
}

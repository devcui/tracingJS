import { Trace } from "../trace";

export interface CollectorStrategy {
  collect<T extends Trace>(data: T): void;
}

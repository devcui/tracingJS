import { Trace, TraceExtra } from "../trace";

export abstract class Collector {
  readonly extra: TraceExtra;
  constructor(extra: TraceExtra) {
    this.extra = extra;
  }
  abstract collect(data: Trace): void;
}

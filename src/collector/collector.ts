import {Trace, TraceExtra} from "../trace";
import { CollectorStrategy } from "./types";

export abstract class Collector implements CollectorStrategy {
  extra?: TraceExtra;

  protected constructor(extra?: TraceExtra) {
    if (extra) {
      this.extra = extra;
    }
  }

  collect(data: Trace): void {
    if (this.extra) {
      data.extra = this.extra
    }
  }
}

import {Trace, TraceExtra} from "../trace";
import {Collect} from "./interface";

export abstract class Collector implements Collect {
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

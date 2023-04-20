import { Trace, TraceExtra } from "../../trace";
import { Collector } from "../collector";

export class WorkerCollector extends Collector {
  worker: Worker;
  constructor(src: string, extra: TraceExtra) {
    super(extra);
    this.worker = new Worker(src);
  }
  collect(data: Trace): void {
    data.extra  = this.extra;
    this.worker.postMessage(data);
  }
}

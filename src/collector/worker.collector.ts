import { TraceExtra } from "../trace";
import { Collector } from "./collector";

export class WorkerCollector extends Collector {
  worker: Worker;
  constructor(src: string, extra: TraceExtra) {
    super(extra);
    this.worker = new Worker(src);
  }
  collect(data: any): void {
    this.worker.postMessage({ ...data, ...this.extra });
  }
}

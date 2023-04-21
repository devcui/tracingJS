import { Collector } from "../collector";
import { Trace, TraceExtra } from "../../trace";

export class WorkerCollector extends Collector {
  worker: Worker;

  private constructor(src: string, extra?: TraceExtra) {
    super(extra);
    this.worker = new Worker(src);
  }

  static create(src: string ='./assets/worker.js', extra?: TraceExtra): Collector {
    return new WorkerCollector(src, extra);
  }


  override collect(data: Trace): void {
    super.collect(data);
    this.worker.postMessage(data);
  }
}

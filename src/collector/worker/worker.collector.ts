import {Trace, TraceExtra} from "../../trace";
import {Collector} from "../collector";

export class WorkerCollector extends Collector {
  worker: Worker;

  static create(src: string, extra?: TraceExtra): Collector {
    return new WorkerCollector(src, extra)
  }

  private constructor(src: string, extra?: TraceExtra) {
    super(extra);
    this.worker = new Worker(src);
  }

  override collect(data: Trace): void {
    super.collect(data)
    this.worker.postMessage(data);
  }

}

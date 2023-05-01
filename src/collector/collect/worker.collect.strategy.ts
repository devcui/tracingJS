import { TracePacket } from "../../types";
import { CollectStrategy } from "../types";

export class WorkerCollectStrategy implements CollectStrategy {
  private worker?: Worker;
  constructor(workerSrc: string) {
    if (typeof Worker === "undefined") {
      throw new Error("Worker is not defined");
    }
    if (!this.worker) {
      this.worker = new Worker(workerSrc);
    }
  }
  collect(data: TracePacket<any>): void {
    this.worker?.postMessage(data);
  }
}

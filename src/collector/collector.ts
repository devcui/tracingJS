import { TracePacket } from "../types";
import { CollectStrategy } from "./types";

export abstract class Collector implements CollectStrategy {
  constructor(private strategy: CollectStrategy) {}
  collect<T>(data: TracePacket<T>): void {
    this.strategy.collect(data);
  }
}

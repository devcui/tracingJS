import { TracePacket } from "../types";

export interface Collect {
  collect(data: TracePacket, strategy: CollectStrategy): void;
}

export interface CollectStrategy {
  collect(data: TracePacket): void;
}

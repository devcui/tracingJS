import {TracePacket} from "../types";
import {CollectStrategy} from "./types";

export abstract class Collector implements CollectStrategy {
    public strategy: CollectStrategy;

    protected constructor(strategy: CollectStrategy) {
        this.strategy = strategy
    }

    collect<T>(data: TracePacket<T>): void {
        this.strategy.collect(data);
    }
}

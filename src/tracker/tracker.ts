import {TrackStrategy} from "./types";

export abstract class Tracker<T = any, U = any> implements TrackStrategy<T, U> {
    constructor(private strategy: TrackStrategy<T>) {
    }

    track(data: T): U | undefined {
        return this.strategy.track(data);
    }
}

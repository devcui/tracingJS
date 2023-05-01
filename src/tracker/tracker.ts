import { TrackStrategy } from "./types";

export abstract class Tracker<T> implements TrackStrategy<T> {
  constructor(private strategy: TrackStrategy<T>) {}
  track(event: Event): T | undefined {
    return this.strategy.track(event);
  }
}

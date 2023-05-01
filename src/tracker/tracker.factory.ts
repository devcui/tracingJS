import { SimpleTracker } from "./simple.tracker";
import { Tracker } from "./tracker";
import { TrackStrategy } from "./types";

export abstract class TrackerFactory {
  static create<T>(strategy: TrackStrategy<T>): Tracker<T> {
    return new SimpleTracker<T>(strategy);
  }
}

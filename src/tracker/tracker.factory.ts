import {SimpleTracker} from "./simple.tracker";
import {Tracker} from "./tracker";
import {TrackStrategy} from "./types";

export abstract class TrackerFactory {
    static create<T, U>(strategy: TrackStrategy<T, U>): Tracker<T, U> {
        return new SimpleTracker<T, U>(strategy);
    }
}

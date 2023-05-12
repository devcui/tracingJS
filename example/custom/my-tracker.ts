import {
  TrackStrategy,
  ClickTrackStrategyFactory,
  Tracker,
  TrackerFactory,
} from "../dist/tracingJS/es";

// generate your own tracker or use default
export class MyTracker<T> extends Tracker<T> {
  private mystrategy: TrackStrategy<T>;
  constructor(strategy: TrackStrategy<T>) {
    super(strategy);
    this.mystrategy = strategy;
  }
  track(event: Event): T | undefined {
    return this.mystrategy.track(event);
  }
}

// generate your own tracker factory or use default
export class MyTrackerFactory extends TrackerFactory {
  static createMyTracker<T>(strategy: TrackStrategy<T>): MyTracker<T> {
    return new MyTracker<T>(strategy);
  }
}

// generate your own track strategy or use default
export class MyTrackStrategy implements TrackStrategy<any> {
  constructor() {}
  track(event: Event): any | undefined {
    return {};
  }
}

// generate your own track strategy factory or use default
export class MyClickTrackStrategyFactory extends ClickTrackStrategyFactory {
  static createMyTrack(): TrackStrategy<any> {
    return new MyTrackStrategy();
  }
}

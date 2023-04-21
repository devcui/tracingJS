import { TClick, Trace } from "../../trace";


export interface CollectingClicksStrategy {
  collectingClicks(event: Event): Trace<TClick> | undefined;
}

export interface CollectingClicks {
  collectingClicks(
    collectingClicksStrategy: CollectingClicksStrategy,
    event: Event
  ): Trace<TClick> | undefined;
}

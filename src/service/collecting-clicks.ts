import { TClick, Trace } from "../trace";

export interface CollectingClicks {
  collectingClicks(event: Event): Trace<TClick> | undefined;
}

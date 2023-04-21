import { TClick, Trace } from "../../../trace";
import { TraceElement } from "../../domain";
import { CollectingClicksStrategy } from "../collecting-clicks.type";

export class AdapterCollectingClicks implements CollectingClicksStrategy {
  private constructor() {}
  static create(): AdapterCollectingClicks {
    return new AdapterCollectingClicks();
  }
  collectingClicks(event: Event): Trace<TClick> | undefined {
    if (event.target && event.target instanceof HTMLElement) {
      TraceElement.create(event.target);
    }
    return undefined;
  }
}

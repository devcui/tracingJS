import { TraceElement } from "../../domain/element";
import { Trace, TClick } from "../../trace";
import { CollectingClicks } from "../collecting-clicks";

export class CollectingClicksAdapter implements CollectingClicks {
  private constructor() {}
  static create(): CollectingClicksAdapter {
    return new CollectingClicksAdapter();
  }

  collectingClicks(event: Event): Trace<TClick> | undefined {
    if (event.target && event.target instanceof HTMLElement) {
      TraceElement.create(event.target);
    }
    return undefined;
  }
}

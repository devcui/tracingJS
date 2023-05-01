import { TraceElement } from "../../domain";
import { MATCH_POINTS } from "../../utils";
import { TrackStrategy } from "../types";
import { TraceClick } from "./types";

export class DefaultClickTrackStrategy implements TrackStrategy<TraceClick> {
  track(event: Event): TraceClick | undefined {
    if (!event.target) return undefined;
    const el: TraceElement = TraceElement.create(event.target as HTMLElement);
    el.cursor = el.match(MATCH_POINTS);
    if (!el.cursor) return undefined;
    const data: Partial<TraceClick> = {
      id: el.id || undefined,
      position: el.coordinate,
      xpath: el.xpath,
      dataset: el.dataset,
      title: el.title,
    };
    return data as TraceClick;
  }
}

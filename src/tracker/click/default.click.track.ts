import {TraceElement} from "../../domain";
import {clone, MATCH_POINTS} from "../../utils";
import {TrackStrategy} from "../types";
import {TraceClick} from "./types";

export class DefaultClickTrackStrategy implements TrackStrategy<Event, TraceClick> {

    track(event: Event): TraceClick | undefined {
        if (!event.target) return undefined;
        const el: TraceElement = TraceElement.create(event.target as HTMLElement);
        el.cursor = el.match(MATCH_POINTS);
        if (!el.cursor) return undefined;
        const data: Partial<TraceClick> = {
            eventId: clone(el.id),
            position: el.coordinate,
            xpath: el.xpath,
            dataset: clone(el.dataset),
            title: el.title,
        };
        return data as TraceClick;
    }
}

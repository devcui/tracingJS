import {TClick} from "../../../trace";
import {MATCH_POINTS} from "../../../utils";
import {TraceElement} from "../../domain";
import {CollectingClicksStrategy} from "../collecting-clicks.type";

export class AdapterCollectingClicks implements CollectingClicksStrategy {
    private constructor() {
    }

    static create(): AdapterCollectingClicks {
        return new AdapterCollectingClicks();
    }

    collectingClicks(event: Event): TClick | undefined {
        if (!event.target) return undefined;
        const el: TraceElement = TraceElement.create(event.target as HTMLElement);
        el.cursor = el.match(MATCH_POINTS)
        if (!el.cursor) return undefined;
        const data: Partial<TClick> = {
            id: el.id || undefined,
            position: el.coordinate,
            xpath: el.xpath,
            dataset: el.dataset,
            title: el.title
        };
        return data as TClick;
    }
}

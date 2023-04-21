import {TClick} from "../../trace";


export interface CollectingClicksStrategy {
    collectingClicks(event: Event): TClick | undefined;
}

export interface CollectingClicks {
    collectingClicks(collectingClicksStrategy: CollectingClicksStrategy, event: Event): TClick | undefined;
}

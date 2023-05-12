import {TrackStrategy} from "../types";
import {DefaultHttpTrack} from "./default.http.track";
import {DefaultFetchTrack} from "./default.fetch.track";
import {EventFetch, EventHttp, TraceFetch, TraceHttp} from "./types";

export class HttpTrackStrategyFactory {
    static createDefaultHttp(ignore?: string[]): TrackStrategy<EventHttp, Promise<TraceHttp|null>> {
        return new DefaultHttpTrack(ignore);
    }

    static createDefaultFetch(ignore?: string[]): TrackStrategy<EventFetch, Promise<TraceFetch|null>> {
        return new DefaultFetchTrack(ignore);
    }
}

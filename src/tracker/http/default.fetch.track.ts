import {TrackStrategy} from "../types";
import {EventFetch, TraceFetch} from "./types";

export class DefaultFetchTrack implements TrackStrategy<EventFetch, Promise<TraceFetch|null>> {
    ignore: string[] = [];

    constructor(ignore?: string[]) {
        if (ignore) {
            this.ignore = ignore
        }
    }

    async track(data: EventFetch): Promise<TraceFetch|null> {
        const {args, triggerTime,res} = data;
        const [url, req] = args;
        if(this.isIgnore(url) || (res.status!==200 && res.status!==304) ){
            return null
        }
        return {
            credentials: req.credentials,
            duration: Date.now() - triggerTime,
            eventId: "fetch",
            headers: req.headers,
            method: req.method,
            mode: req.mode,
            params: req.body,
            referrer: req.referrer,
            referrerPolicy: req.referrerPolicy,
            src: url,
            status: 200,
            triggerTime: Date.now()
        }
    }

    isIgnore(uri: string): boolean {
        let flag = false;
        this.ignore.forEach((i) => {
            if (uri.includes(i)) flag = true
        })
        return flag
    }
}
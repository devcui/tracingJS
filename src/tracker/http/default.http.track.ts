import {TrackStrategy} from "../types";
import {EventHttp, TraceHttp} from "./types";


export class DefaultHttpTrack implements TrackStrategy<EventHttp, Promise<TraceHttp|null>> {
    ignore: string[] = [];

    constructor(ignore?: string[]) {
        if (ignore) {
            this.ignore = ignore
        }
    }

    track(data: EventHttp): Promise<TraceHttp|null> {
        const {type, triggerTime} = data;
        return new Promise<TraceHttp>((resolve) => {
            const {xhr, args} = data;
            // readyState发生改变时触发,也就是请求状态改变时
            // readyState 会依次变为 2,3,4 也就是会触发三次这里
            xhr.addEventListener("readystatechange", () => {
                const {readyState, status, responseURL} = xhr
                if(this.isIgnore(responseURL)){
                    resolve(null as any)
                }
                if (readyState === 4 && !this.isIgnore(responseURL)) {
                    if (status === 200 || status === 304) {
                        if (type === 'open') {
                            const method = args[0]
                            resolve({
                                credentials: xhr.withCredentials ? 'include' : 'omit',
                                eventId: 'xhr_open',
                                method: method,
                                src: responseURL,
                                status: status,
                                triggerTime: triggerTime,
                                duration: Date.now() - triggerTime,
                            })
                        }
                        if (type === 'send') {
                            const params = args[0]
                            resolve({
                                credentials: xhr.withCredentials ? 'include' : 'omit',
                                eventId: 'xhr_send',
                                src: responseURL,
                                status: status,
                                triggerTime: triggerTime,
                                duration: Date.now() - triggerTime,
                                params: params,
                            })
                        }
                    }
                }
            })
        })
    }

    isIgnore(uri: string): boolean {
        let flag = false;
        this.ignore.forEach((i) => {
            if (uri.includes(i)) flag = true
        })
        return flag
    }
}
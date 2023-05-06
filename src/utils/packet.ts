import {TraceExtra, TracePacket} from "../types";
import {Win} from "./window";

export class Packet {
    static create<T>(
        data: T,
        extra?: TraceExtra,
    ): TracePacket<T> {
        return {
            data: data,
            triggerTime: Date.now(),
            screen: Win.screenArgs(),
            visible: Win.visibleArea(),
            url: Win.url(),
            extra: extra,
        };
    }
}

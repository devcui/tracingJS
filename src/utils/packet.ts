import { UAParser } from "ua-parser-js";
import { TracePosition, TraceUserAgent } from "../types";
import { TraceExtra, TracePacket, TraceTag, TraceType } from "../types";
import { Win, win } from "./window";

declare var posi: TracePosition | undefined;
declare var uagent: TraceUserAgent | undefined;
export class Packet {
  static create<T>(
    type: TraceType,
    data: T,
    extra?: TraceExtra,
    ...tags: TraceTag[]
  ): TracePacket<T> {
    if (!posi) {
      win().navigator.geolocation.getCurrentPosition((position) => {
        posi = position.coords;
      });
    }
    if (!uagent) {
      uagent = UAParser();
    }
    return {
      data: data,
      triggerTime: Date.now(),
      screen: Win.screenArgs(),
      visible: Win.visibleArea(),
      position: posi,
      userAgent: uagent,
      url: Win.url(),
      extra: extra,
      type: type,
      tags: tags,
    };
  }
}

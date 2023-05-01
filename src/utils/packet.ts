import { TraceExtra, TracePacket, TraceTag, TraceType } from "../types";
import { Win } from "./window";

export class Packet {
  static create<T>(
    type: TraceType,
    data: T,
    extra?: TraceExtra,
    ...tags: TraceTag[]
  ): TracePacket<T> {
    return {
      data: data,
      triggerTime: Date.now(),
      screen: Win.screenArgs(),
      visible: Win.visibleArea(),
      url: Win.url(),
      extra: extra,
      type: type,
      tags: tags,
    };
  }
}

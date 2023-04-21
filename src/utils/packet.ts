import { Trace, TraceTag, TraceType } from "../trace";
import { Win } from "./window";

export class Packet {
  static create<T>(type: TraceType, data: T, ...tags: TraceTag[]): Trace<T> {
    return {
      data: data,
      screen: Win.screenArgs(),
      visible: Win.visibleArea(),
      triggerTime: Date.now(),
      url: Win.url(),
      type: type,
      tags: tags,
    };
  }
}

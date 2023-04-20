export interface Trace<T = unknown> {
  tags: string[];
  type: TraceType;
  extra: TraceExtra;
  url: string;
  position: TracePosition;
  triggerTime: number;
  data?: T;
}

export type TraceType = "performance" | "error" | "event";

export interface TraceExtra {
  [key: string]: any;
}

export interface TracePosition {
  longitude: number;
  latitude: number;
}

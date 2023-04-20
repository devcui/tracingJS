export interface Trace<T = unknown> {
  tags: TraceTag[];
  type: TraceType;
  extra: TraceExtra;
  url: string;
  position: TracePosition;
  screen: TraceScreen;
  visible: TraceVisibleArea;
  triggerTime: number;
  data?: T;
}

export type TraceTag = "event" | "click";
export type TraceType = "performance" | "error" | "event";

export interface TraceExtra {
  [key: string]: any;
}


export interface TracePosition {
  readonly latitude: number;
  readonly longitude: number;
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly speed: number | null;

}

export interface TraceScreen {
  width: number;
  height: number;
}

export interface TraceVisibleArea {
  width: number;
  height: number;
}

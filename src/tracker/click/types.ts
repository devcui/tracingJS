export interface TraceClick {
  id: string;
  position: TraceElementPosition;
  xpath: string;
  dataset: JSONString;
  title: string;
}

export interface TraceElementPosition {
  x: number;
  y: number;
}

export type JSONString = string;
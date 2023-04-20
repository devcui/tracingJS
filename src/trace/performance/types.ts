export interface PerformanceMeta {
  src: string;
  duration: number;
}

export interface PerformanceFirstPaint extends PerformanceMeta {}

export interface PerformanceResource extends PerformanceMeta {}

export interface PerformanceAsyncResource extends PerformanceMeta {}

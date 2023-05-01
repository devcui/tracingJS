export interface Track<T> {
  track(event: Event, strategy: TrackStrategy<T>): T | undefined;
}

export interface TrackStrategy<T> {
  track(event: Event): T | undefined;
}

export interface TrackStrategy<T = any, U = any> {
    track(data: T): U | undefined;
}

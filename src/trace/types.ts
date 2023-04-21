export interface Trace<T = unknown> {
    tags: TraceTag[];
    type: TraceType;
    extra?: TraceExtra;
    url: string;
    position?: TracePosition;
    screen: TraceScreen;
    visible: TraceVisibleArea;
    triggerTime: number;
    data?: T;
}

export enum TraceTag {
    Event = "event",
    Click = "click",
}

export enum TraceType {
    Performance = "performance",
    Error = "error",
    Event = "event",
}

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
    readonly availHeight: number;
    readonly availWidth: number;
    readonly colorDepth: number;
    readonly height: number;
    readonly pixelDepth: number;
    readonly width: number;
}

export interface TraceVisibleArea {
    width: number;
    height: number;
}

export enum TracePoint {
    ID = "data-event-id",
    Title = "data-event-title",
    Container = "data-event-container",
}


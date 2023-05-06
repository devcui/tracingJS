import {Collector} from "./collector";
import {TraceClick, TracePerformance, Tracker} from "./tracker";

export interface TracePacket<T = any> {
    [key: string]: any;

    tags?: TraceTag[];
    type?: TraceType;
    extra?: TraceExtra;
    url: string;
    position?: TracePosition;
    userAgent?: TraceUserAgent;
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
    Error = "error",
    Event = "event",
    Performance = "performance",
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

export interface TraceUserAgent {
    browser: TraceUserAgentBrowser;
    cpu: TraceUserAgentCpu;
    device: TraceUserAgentDevice;
    engine: TraceUserAgentEngine;
    os: TraceUserAgentOS;
    ua: string;
}

export interface TraceUserAgentBrowser {
    name?: string;
    version?: string;
    major?: string;
}

export interface TraceUserAgentCpu {
    architecture?: string;
}

export interface TraceUserAgentDevice {
    model?: string;
    type?: string;
    vendor?: string;
}

export interface TraceUserAgentEngine {
    name?: string;
    version?: string;
}

export interface TraceUserAgentOS {
    name?: string;
    version?: string;
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

export interface TracingRegistry {
    [key: string]: Browser;
}

export interface Browser {
    collector?: Collector;
    clickTracker?: Tracker<TraceClick>;
    performanceTracker?: Tracker<TracePerformance>;
}

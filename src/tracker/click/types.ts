export interface TraceClick {
    eventId: string;
    position: TraceElementPosition;
    xpath: string;
    dataset: any;
    title: string;
}

export interface TraceElementPosition {
    x: number;
    y: number;
}

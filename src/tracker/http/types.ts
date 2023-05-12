export interface EventHttp {
    triggerTime: number
    type: string
    xhr: XMLHttpRequest
    args: any[]
}

export interface EventFetch {
    triggerTime: number
    type: string;
    res: Response
    args: any[]
}

export interface TraceHttp {
    eventId: string
    src: string
    method?: string
    status: number
    triggerTime: number
    duration?: number
    params?: any
    credentials: string
}

export interface TraceFetch extends TraceHttp {
    headers: Record<any, any>
    mode: string
    referrer: string
    referrerPolicy: string
}
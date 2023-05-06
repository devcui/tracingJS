import {Collector} from "./collector";
import {CollectStrategy} from "./types";
import {TracePacket, TracePosition, TraceTag, TraceType, TraceUserAgent} from "../types";
import {win} from "../utils";
import {UAParser} from "ua-parser-js";

export class SimpleCollector extends Collector {
    private position?: TracePosition;
    private userAgent?: TraceUserAgent;
    private notTrack: string | null = null;
    private cookieEnabled: boolean = false
    private touchstart: boolean = false;
    private language?: string
    private timezoneOffset?: number;

    constructor(strategy: CollectStrategy) {
        super(strategy)
        this.checkTouchStart()
        this.checkLanguage()
        this.checkTimezoneOffSet();
        this.checkTrack();
        this.checkCookie();
        this.checkPositionAgent();
    }


    checkTouchStart(): void {
        this.touchstart = (('ontouchstart' in win()) || (win().navigator.maxTouchPoints > 0));
    }

    checkLanguage(): void {
        this.language = win().navigator.language
    }

    checkTimezoneOffSet(): void {
        this.timezoneOffset = new Date().getTimezoneOffset()
    }

    checkTrack(): void {
        this.notTrack = win().navigator.doNotTrack;
    }

    checkCookie(): void {
        this.cookieEnabled = win().navigator.cookieEnabled
    }


    checkPositionAgent(): void {
        if (!this.position) {
            win().navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed} = position.coords;
                this.position = {
                    latitude: latitude,
                    longitude: longitude,
                    accuracy: accuracy,
                    altitude: altitude,
                    altitudeAccuracy: altitudeAccuracy,
                    heading: heading,
                    speed: speed,
                };
            });
        }
        if (!this.userAgent) {
            this.userAgent = UAParser();
        }
    }

    override collect<T>(data: TracePacket<T>): void {
        // every time ask position permission
        this.checkPositionAgent()
        // hook data
        data["touchstart"] = this.touchstart
        data["cookieEnabled"] = this.cookieEnabled
        data["notTrack"] = this.notTrack
        data["language"] = this.language
        data["timezoneOffset"] = this.timezoneOffset
        data["position"] = this.position
        data["userAgent"] = this.userAgent
        data.type = TraceType.Event
        data.tags = [TraceTag.Event, TraceTag.Click]
        // post data
        this.strategy.collect(data);
    }
}

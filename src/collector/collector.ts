import {Trace, TraceExtra} from "../trace";
import {Collect} from "./interface";

export abstract class Collector implements Collect {
    readonly extra: TraceExtra;

    constructor(extra: TraceExtra) {
        this.extra = extra;
    }

    abstract collect(data: Trace): void ;
}

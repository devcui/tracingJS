import {Trace} from "../trace";

export interface Collect {
    collect<T extends Trace>(data: T): void;
}
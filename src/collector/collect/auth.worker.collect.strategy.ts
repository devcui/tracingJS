import {CollectStrategy, TokenType} from "../types";
import {TracePacket} from "../../types";


export class AuthWorkerCollectStrategy implements CollectStrategy {
    private readonly tokenFunc: () => TokenType;
    private readonly worker?: Worker;

    constructor(workerSrc: string, tokenFunc: () => TokenType) {
        if (typeof Worker === "undefined") {
            throw new Error("Worker is not defined");
        }
        if (!this.worker) {
            this.worker = new Worker(workerSrc);
        }
        this.tokenFunc = tokenFunc;
    }

    collect(data: TracePacket<any>): void {
        const token = this.tokenFunc()
        this.worker?.postMessage({token, data})
    }
}


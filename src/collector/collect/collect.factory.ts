import {ConsoleCollectStrategy} from "./console.collect.strategy";
import {WorkerCollectStrategy} from "./worker.collect.strategy";
import {AuthWorkerCollectStrategy} from "./auth.worker.collect.strategy";
import {TokenType} from "../types";

export abstract class CollectStrategyFactory {
    public static createConsole(): ConsoleCollectStrategy {
        return new ConsoleCollectStrategy();
    }

    public static createWorker(
        workerStr: string
    ): WorkerCollectStrategy {
        return new WorkerCollectStrategy(workerStr);
    }

    public static createAuthWorkerCollectStrategy(workerSrc: string, tokenFunc: () => TokenType): AuthWorkerCollectStrategy {
        return new AuthWorkerCollectStrategy(workerSrc, tokenFunc)
    }
}

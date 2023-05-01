import { ConsoleCollectStrategy } from "./console.collect.strategy";
import { WorkerCollectStrategy } from "./worker.collect.strategy";

export abstract class CollectStrategyFactory {
  public static createConsole(): ConsoleCollectStrategy {
    return new ConsoleCollectStrategy();
  }

  public static createWorker(
    workerStr: string
  ): WorkerCollectStrategy {
    return new WorkerCollectStrategy(workerStr);
  }
}

import { Collector } from "../collector";
import {Collect} from "../collector";
import {Trace} from "../trace";

export abstract class BrowserAdapter implements Collect{
  private collector?: Collector;

  setCollector(collector: Collector): void {
    this.collector = collector;
  }

  collect(data: Trace): void {
    if (this.collector) {
      this.collector.collect(data);
    } else {
      throw new Error("Collector is not defined");
    }
  }

  abstract addListener(): void;
}

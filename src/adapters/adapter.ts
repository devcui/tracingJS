import { Collector } from "../collector";

export abstract class BrowserAdapter {
  private collector?: Collector;

  setCollector(collector: Collector): void {
    this.collector = collector;
  }

  collect(data: any): void {
    if (this.collector) {
      this.collector.collect(data);
    } else {
      throw new Error("Collector is not defined");
    }
  }

  abstract addListener(): void;
}

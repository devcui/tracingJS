import { UAParser } from "ua-parser-js";
import { BrowserAdapter, BrowserAdapterFactory } from "./adapters";
import { Collector } from "./collector";

export class TracingJS {
  private readonly adapter: BrowserAdapter;
  constructor(collector: Collector) {
    const type = UAParser(window.navigator.userAgent).browser.name!;
    const adapter = BrowserAdapterFactory.createAdapter(type);
    adapter.setCollector(collector);
    this.adapter = adapter;
  }

  trace(): void {
    this.adapter.addListener();
  }
}

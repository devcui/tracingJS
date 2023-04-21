import { UAParser } from "ua-parser-js";
import {
  BrowserAdapter,
  BrowserAdapterFactory,
  CollectingClicksStrategy,
} from "./adapters";
import { CollectorStrategy, WorkerCollector } from "./collector";
import { AdapterCollectingClicks } from "./adapters/service/impl/adapter.collecting-clicks";

export class TracingJS {
  static trace(
    window: Window,
    collectorStrategy: CollectorStrategy = WorkerCollector.create(),
    collectingClicksStrategy: CollectingClicksStrategy = AdapterCollectingClicks.create()
  ) {
    const type =
      UAParser(window.navigator.userAgent).browser.name?.toLocaleLowerCase() ||
      "";
    const adapter: BrowserAdapter = BrowserAdapterFactory.createAdapter(
      window,
      type
    );
    adapter.start(collectorStrategy, collectingClicksStrategy);
  }
}

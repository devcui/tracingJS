import {UAParser} from "ua-parser-js";
import {BrowserAdapter, BrowserAdapterFactory} from "./adapters";
import {Collector} from "./collector";

export class TracingJS {
  static trace(window: Window, collector: Collector) {
    const type = UAParser(window.navigator.userAgent).browser.name?.toLocaleLowerCase() || "";
    const adapter: BrowserAdapter = BrowserAdapterFactory.createAdapter(window, type, collector);
    adapter.linkStart();
  }
}

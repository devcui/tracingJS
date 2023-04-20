import {BrowserAdapter} from "../adapter";
import {EdgeAdapter, UnknownAdapter} from "../browser";
import {Collector} from "../../collector";

export class BrowserAdapterFactory {
  static createAdapter(window: Window, browserType: string, collector: Collector): BrowserAdapter {
    switch (browserType) {
      case "edge":
        return new EdgeAdapter(window, collector);
      default:
        throw new UnknownAdapter(window, collector);
    }
  }
}

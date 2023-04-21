import {BrowserAdapter} from "../adapter";
import {EdgeAdapter, UnknownAdapter} from "../browser";

export class BrowserAdapterFactory {
  static createAdapter(window: Window, browserType: string): BrowserAdapter {
    switch (browserType) {
      case "edge":
        return new EdgeAdapter(window);
      default:
        throw new UnknownAdapter(window);
    }
  }
}

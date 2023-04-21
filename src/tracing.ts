import { UAParser } from "ua-parser-js";
import {
  BrowserAdapter,
  BrowserAdapterFactory,
  TracingStrategy,
} from "./adapters";

export class TracingJS {
  static trace(window: Window, strategy?: TracingStrategy) {
    const type =
      UAParser(window.navigator.userAgent).browser.name?.toLocaleLowerCase() ||
      "";
    const adapter: BrowserAdapter = BrowserAdapterFactory.createAdapter(
      window,
      type,
      strategy
    );
    adapter.start();
  }
}

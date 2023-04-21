import { BrowserAdapter } from "../adapter";
import { EdgeAdapter, UnknownAdapter } from "../browser";
import { TracingStrategy } from "../types";

export class BrowserAdapterFactory {
  static createAdapter(
    window: Window,
    browserType: string,
    strategy?: TracingStrategy
  ): BrowserAdapter {
    switch (browserType) {
      case "edge":
        return new EdgeAdapter(window,strategy);
      default:
        throw new UnknownAdapter(window,strategy);
    }
  }
}

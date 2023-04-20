import { ChromeAdapter } from "../browser/chrome";
import { SafariAdapter } from "../browser/safari";
import { BrowserAdapter } from "../adapter";
import { UnknownAdapter } from "../browser/unknown";
import { FirefoxAdapter } from "../browser/firefox";

export class BrowserAdapterFactory {
  static createAdapter(browserType: string): BrowserAdapter {
    switch (browserType) {
      case "Chrome":
        return new ChromeAdapter();
      case "Firefox":
        return new FirefoxAdapter();
      case "Safari":
        return new SafariAdapter();
      default:
        throw new UnknownAdapter();
    }
  }
}

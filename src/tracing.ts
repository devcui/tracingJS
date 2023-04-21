import {UAParser} from "ua-parser-js";
import {
    BrowserAdapter,
    BrowserAdapterFactory,
    TracingStrategy,
} from "./adapters";
import {win} from "./utils";

export class TracingJS {
    static trace(window: Window, strategy?: TracingStrategy) {
        win(window)
        const type = UAParser(window.navigator.userAgent).browser.name?.toLocaleLowerCase() || "";
        const adapter: BrowserAdapter = BrowserAdapterFactory.createAdapter(type, strategy);
        adapter.start();
    }
}

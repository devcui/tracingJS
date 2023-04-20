import {BrowserAdapter} from "../adapter";
import {TClick, Trace} from "../../trace";

export class UnknownAdapter extends BrowserAdapter {
  handleClickEvent(event: Event): Trace<TClick> {
    return {e: 'hahaha'} as any
  }
}

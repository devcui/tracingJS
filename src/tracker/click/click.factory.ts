import { TrackStrategy } from "../types";
import { ChromeClickTrackStrategy } from "./chrome.click.track";
import { DefaultClickTrackStrategy } from "./default.click.track";
import { TraceClick } from "./types";

export class ClickTrackStrategyFactory {
  static createChromeClick(): TrackStrategy<Event,TraceClick> {
    return new ChromeClickTrackStrategy();
  }

  static createDefaultClick(): TrackStrategy<Event,TraceClick> {
    return new DefaultClickTrackStrategy();
  }
}

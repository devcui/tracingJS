import { TrackStrategy } from "../types";
import { ChromeClickTrackStrategy } from "./chrome.click.track";
import { DefaultClickTrackStrategy } from "./default.click.track";
import { TraceClick } from "./types";

export class TrackStrategyFactory {
  static createChromeClick(): TrackStrategy<TraceClick> {
    return new ChromeClickTrackStrategy();
  }

  static createDefaultClick(): TrackStrategy<TraceClick> {
    return new DefaultClickTrackStrategy();
  }
}

import {
  TracingJS,
  TracingRegistry,
} from "../dist/tracingJS/es";
import {
  MyCollectorFactory,
  MyCollectorStrategyFactory,
} from "./my-collect";
import { MyTrackStrategyFactory, MyTrackerFactory } from "./my-tracker";

export function myMain() {
  const registry: TracingRegistry = {
    default: {
      collector: MyCollectorFactory.createMyCollector(
        MyCollectorStrategyFactory.createMyCollectStrategy({ say: "ahaha" })
      ),
      clickTracker: MyTrackerFactory.createMyTracker(
        MyTrackStrategyFactory.createMyTrack()
      ),
    },
  };
  const tracingJS = new TracingJS(window, {}, registry);
  tracingJS.run();
}

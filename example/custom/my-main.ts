import {
    TracingJS,
    TracingRegistry,
} from "@yelon/tracingJS/es";
import {
    MyCollectorFactory,
    MyCollectorStrategyFactory,
} from "./my-collect";
import {MyClickTrackStrategyFactory, MyTrackerFactory} from "./my-tracker";

export function myMain() {
    TracingJS.init(window)
    const registry: TracingRegistry = {
        default: {
            collector: MyCollectorFactory.createMyCollector(
                MyCollectorStrategyFactory.createMyCollectStrategy({say: "ahaha"})
            ),
            clickTracker: MyTrackerFactory.createMyTracker(
                MyClickTrackStrategyFactory.createMyTrack()
            ),
        },
    };
    TracingJS.crate({}, registry).run();
}

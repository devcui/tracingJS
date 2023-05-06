import {
    TracingJS,
    TracingRegistry,
} from "@yelon/tracingJS/es";
import {
    MyCollectorFactory,
    MyCollectorStrategyFactory,
} from "./my-collect";
import {MyTrackStrategyFactory, MyTrackerFactory} from "./my-tracker";

export function myMain() {
    TracingJS.init(window)
    const registry: TracingRegistry = {
        default: {
            collector: MyCollectorFactory.createMyCollector(
                MyCollectorStrategyFactory.createMyCollectStrategy({say: "ahaha"})
            ),
            clickTracker: MyTrackerFactory.createMyTracker(
                MyTrackStrategyFactory.createMyTrack()
            ),
        },
    };
    TracingJS.crate({}, registry).run();
}

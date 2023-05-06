import {
    CollectStrategyFactory,
    CollectorFactory,
    TraceClick,
    TracingJS,
    TracingRegistry,
    TrackStrategyFactory,
    TrackerFactory,
} from "@yelon/tracingJS/es";

// default func
export function defaultMain() {
    TracingJS.init(window)
    TracingJS.create({username: "dav", userid: "xxx"}).run();
}

// use registry
export function registryMain() {
    TracingJS.init(window)
    const registry: TracingRegistry = {
        default: {
            collector: CollectorFactory.create(
                CollectStrategyFactory.createConsole()
            ),
            clickTracker: TrackerFactory.create<TraceClick>(
                TrackStrategyFactory.createChromeClick()
            ),
        },
        firefox: {
            collector: CollectorFactory.create(
                CollectStrategyFactory.createConsole()
            ),
            clickTracker: TrackerFactory.create<TraceClick>(
                TrackStrategyFactory.createDefaultClick()
            ),
        },
        // edge hasn't click tracker,so used default.clickTracker
        edge: {
            collector: CollectorFactory.create(
                CollectStrategyFactory.createWorker("./assets/worker.js")
            ),
        },
        // chrome hasn't collector,so used default.collector
        chrome: {
            clickTracker: TrackerFactory.create<TraceClick>(
                TrackStrategyFactory.createChromeClick()
            ),
        },
    };
    TracingJS.create({username: "dav", userid: "xxx"},registry).run();
}

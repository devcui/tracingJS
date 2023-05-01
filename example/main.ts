import {
  CollectStrategyFactory,
  CollectorFactory,
  TraceClick,
  TracingJS,
  TracingRegistry,
  TrackStrategyFactory,
  TrackerFactory,
} from "../dist/tracingJS/es";

// default func
export function defaultMain() {
  const extra = { username: "dav", userid: "xxx" };
  const tracingJS = new TracingJS(window, extra);
  tracingJS.run();
}

// use registry
export function registryMain() {
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
  const extra = { username: "dav", userid: "xxx" };
  const tracingJS = new TracingJS(window, extra, registry);
  tracingJS.run();
}

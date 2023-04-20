import { TracingJS, WorkerCollector } from "../src";
const tracingJS = new TracingJS(new WorkerCollector("./worker.js", {}));

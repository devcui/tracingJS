import { UAParser } from "ua-parser-js";
import { TraceUserAgent } from "../trace";

export function UserAgent(): TraceUserAgent {
  const agent = UAParser();
  return {
    browser: agent.browser,
    cpu: agent.cpu,
    device: agent.device,
    engine: agent.engine,
    os: agent.os,
    ua: agent.ua,
  };
}

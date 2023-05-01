import { TracePacket } from "../../types";
import { CollectStrategy } from "../types";

export class ConsoleCollectStrategy implements CollectStrategy {
  constructor(){}
  collect(data: TracePacket<any>): void {
    console.log(data);
  }
}

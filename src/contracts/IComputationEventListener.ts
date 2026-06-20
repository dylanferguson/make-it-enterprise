import type { IComputationEvent } from "./IComputationEvent.js";

export interface IComputationEventListener {
  onEvent(event: IComputationEvent): void;
  getListenerName(): string;
  getListenerPriority(): number;
  supportsEventType(eventType: string): boolean;
}

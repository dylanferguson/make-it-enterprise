import type { IComputationEvent } from "./IComputationEvent.js";
import type { IComputationEventListener } from "./IComputationEventListener.js";

export interface IComputationEventNotificationBus {
  publishEvent(event: IComputationEvent): void;
  registerListener(listener: IComputationEventListener): void;
  unregisterListener(listenerName: string): boolean;
  getRegisteredListeners(): readonly IComputationEventListener[];
  getBusName(): string;
  getBusVersion(): string;
  clearListeners(): void;
}

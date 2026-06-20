import type { ILifecycleEvent } from "./ILifecycleEvent.js";

export interface ILifecycleEventListener {
  onLifecycleEvent(event: ILifecycleEvent): void;
  getListenerName(): string;
  getListenerPriority(): number;
}

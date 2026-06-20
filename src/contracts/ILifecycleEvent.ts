import type { LifecycleState } from "./ILifecycleManagedBean.js";

export interface ILifecycleEvent {
  getEventType(): LifecycleEventType;
  getBeanName(): string;
  getSource(): string;
  getTimestamp(): number;
  getPreviousState(): LifecycleState;
  getNewState(): LifecycleState;
}

export enum LifecycleEventType {
  BEFORE_INITIALIZE = "BEFORE_INITIALIZE",
  AFTER_INITIALIZE = "AFTER_INITIALIZE",
  BEFORE_START = "BEFORE_START",
  AFTER_START = "AFTER_START",
  BEFORE_STOP = "BEFORE_STOP",
  AFTER_STOP = "AFTER_STOP",
  BEFORE_DESTROY = "BEFORE_DESTROY",
  AFTER_DESTROY = "AFTER_DESTROY",
  TRANSITION_FAILED = "TRANSITION_FAILED",
}

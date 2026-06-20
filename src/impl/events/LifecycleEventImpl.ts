import type { ILifecycleEvent } from "../../contracts/ILifecycleEvent.js";
import { LifecycleEventType } from "../../contracts/ILifecycleEvent.js";
import type { LifecycleState } from "../../contracts/ILifecycleManagedBean.js";

export class LifecycleEventImpl implements ILifecycleEvent {
  private readonly eventType: LifecycleEventType;
  private readonly beanName: string;
  private readonly source: string;
  private readonly timestamp: number;
  private readonly previousState: LifecycleState;
  private readonly newState: LifecycleState;

  constructor(
    eventType: LifecycleEventType,
    beanName: string,
    source: string,
    previousState: LifecycleState,
    newState: LifecycleState,
  ) {
    this.eventType = eventType;
    this.beanName = beanName;
    this.source = source;
    this.timestamp = Date.now();
    this.previousState = previousState;
    this.newState = newState;
  }

  getEventType(): LifecycleEventType {
    return this.eventType;
  }

  getBeanName(): string {
    return this.beanName;
  }

  getSource(): string {
    return this.source;
  }

  getTimestamp(): number {
    return this.timestamp;
  }

  getPreviousState(): LifecycleState {
    return this.previousState;
  }

  getNewState(): LifecycleState {
    return this.newState;
  }
}

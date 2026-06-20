import type { ILifecycleManagedBean } from "../contracts/ILifecycleManagedBean.js";
import { LifecycleState } from "../contracts/ILifecycleManagedBean.js";

export abstract class AbstractBaseLifecycleManagedBean implements ILifecycleManagedBean {
  private state: LifecycleState = LifecycleState.UNINITIALIZED;
  private readonly beanName: string;
  private readonly beanVersion: string;

  constructor(beanName: string, beanVersion: string) {
    this.beanName = beanName;
    this.beanVersion = beanVersion;
  }

  abstract doInitialize(): void;
  abstract doStart(): void;
  abstract doStop(): void;
  abstract doDestroy(): void;

  initialize(): void {
    this.assertState(LifecycleState.UNINITIALIZED);
    try {
      this.doInitialize();
      this.transitionTo(LifecycleState.INITIALIZED);
    } catch (error) {
      this.transitionTo(LifecycleState.FAILED);
      throw error;
    }
  }

  start(): void {
    this.assertState(LifecycleState.INITIALIZED);
    try {
      this.doStart();
      this.transitionTo(LifecycleState.STARTED);
    } catch (error) {
      this.transitionTo(LifecycleState.FAILED);
      throw error;
    }
  }

  stop(): void {
    if (this.state !== LifecycleState.STARTED) {
      return;
    }
    try {
      this.doStop();
      this.transitionTo(LifecycleState.STOPPED);
    } catch (error) {
      this.transitionTo(LifecycleState.FAILED);
      throw error;
    }
  }

  destroy(): void {
    if (this.state === LifecycleState.DESTROYED || this.state === LifecycleState.UNINITIALIZED) {
      return;
    }
    try {
      this.doDestroy();
      this.transitionTo(LifecycleState.DESTROYED);
    } catch (error) {
      this.transitionTo(LifecycleState.FAILED);
      throw error;
    }
  }

  getLifecycleState(): LifecycleState {
    return this.state;
  }

  getBeanName(): string {
    return this.beanName;
  }

  getBeanVersion(): string {
    return this.beanVersion;
  }

  protected assertState(expected: LifecycleState): void {
    if (this.state !== expected) {
      throw new Error(
        `[${this.beanName}] Invalid lifecycle state: expected ${expected}, actual ${this.state}`,
      );
    }
  }

  private transitionTo(newState: LifecycleState): void {
    this.state = newState;
  }
}

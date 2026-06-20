export interface ILifecycleManagedBean {
  initialize(): void;
  start(): void;
  stop(): void;
  destroy(): void;
  getLifecycleState(): LifecycleState;
  getBeanName(): string;
  getBeanVersion(): string;
}

export enum LifecycleState {
  UNINITIALIZED = "UNINITIALIZED",
  INITIALIZED = "INITIALIZED",
  STARTED = "STARTED",
  STOPPED = "STOPPED",
  DESTROYED = "DESTROYED",
  FAILED = "FAILED",
}

import type { ILifecycleManagedBean } from "./ILifecycleManagedBean.js";

export interface ILifecycleManager {
  registerManagedBean(bean: ILifecycleManagedBean): void;
  unregisterManagedBean(beanName: string): void;
  getManagedBean(beanName: string): ILifecycleManagedBean | null;
  initializeAll(): void;
  startAll(): void;
  stopAll(): void;
  destroyAll(): void;
  getManagedBeanNames(): readonly string[];
  getLifecycleManagerName(): string;
}

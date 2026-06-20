import type { ILifecycleManager } from "../contracts/ILifecycleManager.js";
import type { ILifecycleManagedBean } from "../contracts/ILifecycleManagedBean.js";

export abstract class AbstractBaseLifecycleManager implements ILifecycleManager {
  protected readonly managedBeans: Map<string, ILifecycleManagedBean> = new Map();
  private readonly managerName: string;

  constructor(managerName: string) {
    this.managerName = managerName;
  }

  abstract onBeforeInitializeAll(): void;
  abstract onAfterInitializeAll(): void;
  abstract onBeforeStartAll(): void;
  abstract onAfterStartAll(): void;
  abstract onBeforeStopAll(): void;
  abstract onAfterStopAll(): void;
  abstract onBeforeDestroyAll(): void;
  abstract onAfterDestroyAll(): void;

  registerManagedBean(bean: ILifecycleManagedBean): void {
    this.managedBeans.set(bean.getBeanName(), bean);
  }

  unregisterManagedBean(beanName: string): void {
    this.managedBeans.delete(beanName);
  }

  getManagedBean(beanName: string): ILifecycleManagedBean | null {
    return this.managedBeans.get(beanName) ?? null;
  }

  initializeAll(): void {
    this.onBeforeInitializeAll();
    for (const bean of this.managedBeans.values()) {
      bean.initialize();
    }
    this.onAfterInitializeAll();
  }

  startAll(): void {
    this.onBeforeStartAll();
    for (const bean of this.managedBeans.values()) {
      bean.start();
    }
    this.onAfterStartAll();
  }

  stopAll(): void {
    this.onBeforeStopAll();
    const reversed = Array.from(this.managedBeans.values()).reverse();
    for (const bean of reversed) {
      bean.stop();
    }
    this.onAfterStopAll();
  }

  destroyAll(): void {
    this.onBeforeDestroyAll();
    const reversed = Array.from(this.managedBeans.values()).reverse();
    for (const bean of reversed) {
      bean.destroy();
    }
    this.onAfterDestroyAll();
  }

  getManagedBeanNames(): readonly string[] {
    return Array.from(this.managedBeans.keys());
  }

  getLifecycleManagerName(): string {
    return this.managerName;
  }
}

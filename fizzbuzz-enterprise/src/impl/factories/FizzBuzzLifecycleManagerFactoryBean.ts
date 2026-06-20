import { FizzBuzzLifecycleManagerImpl } from "../lifecycle/FizzBuzzLifecycleManagerImpl.js";
import type { ILifecycleManager } from "../../contracts/ILifecycleManager.js";

export class FizzBuzzLifecycleManagerFactoryBean {
  private static instance: ILifecycleManager | null = null;

  static createLifecycleManager(): ILifecycleManager {
    if (FizzBuzzLifecycleManagerFactoryBean.instance === null) {
      FizzBuzzLifecycleManagerFactoryBean.instance = new FizzBuzzLifecycleManagerImpl();
    }
    return FizzBuzzLifecycleManagerFactoryBean.instance;
  }

  static resetLifecycleManager(): void {
    FizzBuzzLifecycleManagerFactoryBean.instance = null;
  }
}

export class FizzBuzzLifecycleManagerFactoryBeanFactory {
  static createFactoryBean(): FizzBuzzLifecycleManagerFactoryBean {
    return new FizzBuzzLifecycleManagerFactoryBean();
  }
}

import { StandardModuloRemainderComputationCommandInvokerImpl } from "../impl/invokers/StandardModuloRemainderComputationCommandInvokerImpl.js";
import type { IModuloRemainderComputationCommandInvoker } from "../contracts/index.js";

export class ModuloRemainderComputationCommandInvokerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ModuloRemainderComputationCommandInvokerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MRC-INVOKER-FBF";

  private static invokerInstance: IModuloRemainderComputationCommandInvoker | null = null;
  private static factoryInitialized = false;

  static initializeFactory(): boolean {
    if (ModuloRemainderComputationCommandInvokerFactoryBeanFactory.factoryInitialized) {
      return false;
    }
    ModuloRemainderComputationCommandInvokerFactoryBeanFactory.factoryInitialized = true;
    return true;
  }

  static createInvoker(): IModuloRemainderComputationCommandInvoker {
    if (ModuloRemainderComputationCommandInvokerFactoryBeanFactory.invokerInstance === null) {
      ModuloRemainderComputationCommandInvokerFactoryBeanFactory.invokerInstance =
        new StandardModuloRemainderComputationCommandInvokerImpl();
    }
    return ModuloRemainderComputationCommandInvokerFactoryBeanFactory.invokerInstance;
  }

  static getInvoker(): IModuloRemainderComputationCommandInvoker | null {
    return ModuloRemainderComputationCommandInvokerFactoryBeanFactory.invokerInstance;
  }

  static getFactoryBeanName(): string {
    return ModuloRemainderComputationCommandInvokerFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ModuloRemainderComputationCommandInvokerFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

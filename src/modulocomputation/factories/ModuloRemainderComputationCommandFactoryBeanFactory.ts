import type { IModuloRemainderComputationCommand } from "../contracts/index.js";
import { NativeJavaScriptModuloRemainderComputationCommandImpl } from "../impl/commands/NativeJavaScriptModuloRemainderComputationCommandImpl.js";
import { AuditTrailModuloRemainderComputationCommandDecoratorImpl } from "../impl/decorators/AuditTrailModuloRemainderComputationCommandDecoratorImpl.js";

export class ModuloRemainderComputationCommandFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ModuloRemainderComputationCommandFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MRC-CMD-FBF";

  private static nativeCommandInstance: IModuloRemainderComputationCommand | null = null;
  private static decoratedCommandInstance: IModuloRemainderComputationCommand | null = null;
  private static factoryInitialized = false;

  static initializeFactory(): boolean {
    if (ModuloRemainderComputationCommandFactoryBeanFactory.factoryInitialized) {
      return false;
    }
    ModuloRemainderComputationCommandFactoryBeanFactory.factoryInitialized = true;
    return true;
  }

  static createNativeCommand(): IModuloRemainderComputationCommand {
    if (ModuloRemainderComputationCommandFactoryBeanFactory.nativeCommandInstance === null) {
      ModuloRemainderComputationCommandFactoryBeanFactory.nativeCommandInstance =
        new NativeJavaScriptModuloRemainderComputationCommandImpl();
    }
    return ModuloRemainderComputationCommandFactoryBeanFactory.nativeCommandInstance;
  }

  static createDecoratedCommand(): IModuloRemainderComputationCommand {
    if (ModuloRemainderComputationCommandFactoryBeanFactory.decoratedCommandInstance === null) {
      const native = ModuloRemainderComputationCommandFactoryBeanFactory.createNativeCommand();
      ModuloRemainderComputationCommandFactoryBeanFactory.decoratedCommandInstance =
        new AuditTrailModuloRemainderComputationCommandDecoratorImpl(native);
    }
    return ModuloRemainderComputationCommandFactoryBeanFactory.decoratedCommandInstance;
  }

  static getNativeCommand(): IModuloRemainderComputationCommand | null {
    return ModuloRemainderComputationCommandFactoryBeanFactory.nativeCommandInstance;
  }

  static getDecoratedCommand(): IModuloRemainderComputationCommand | null {
    return ModuloRemainderComputationCommandFactoryBeanFactory.decoratedCommandInstance;
  }

  static getFactoryBeanName(): string {
    return ModuloRemainderComputationCommandFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ModuloRemainderComputationCommandFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

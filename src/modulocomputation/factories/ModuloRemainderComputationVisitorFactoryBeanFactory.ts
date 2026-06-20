import type { IModuloRemainderComputationVisitor } from "../contracts/index.js";
import { DefaultModuloRemainderComputationVisitorImpl } from "../impl/visitors/DefaultModuloRemainderComputationVisitorImpl.js";

export class ModuloRemainderComputationVisitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ModuloRemainderComputationVisitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MRC-VISITOR-FBF";

  private static visitorInstance: IModuloRemainderComputationVisitor | null = null;
  private static factoryInitialized = false;

  static initializeFactory(): boolean {
    if (ModuloRemainderComputationVisitorFactoryBeanFactory.factoryInitialized) {
      return false;
    }
    ModuloRemainderComputationVisitorFactoryBeanFactory.factoryInitialized = true;
    return true;
  }

  static createVisitor(): IModuloRemainderComputationVisitor {
    if (ModuloRemainderComputationVisitorFactoryBeanFactory.visitorInstance === null) {
      ModuloRemainderComputationVisitorFactoryBeanFactory.visitorInstance =
        new DefaultModuloRemainderComputationVisitorImpl();
    }
    return ModuloRemainderComputationVisitorFactoryBeanFactory.visitorInstance;
  }

  static getVisitor(): IModuloRemainderComputationVisitor | null {
    return ModuloRemainderComputationVisitorFactoryBeanFactory.visitorInstance;
  }

  static getFactoryBeanName(): string {
    return ModuloRemainderComputationVisitorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ModuloRemainderComputationVisitorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

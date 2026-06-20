import { ComputationTypeFlyweightFactoryImpl } from "../impl/factory/ComputationTypeFlyweightFactoryImpl.js";
import { ComputationTypeFlyweightRegistryImpl } from "../impl/factory/ComputationTypeFlyweightRegistryImpl.js";
import type { IFlyweightComputationTypeRegistry } from "../contracts/IFlyweightComputationTypeRegistry.js";

let factorySingleton: ComputationTypeFlyweightFactoryImpl | null = null;
let registrySingleton: IFlyweightComputationTypeRegistry | null = null;

export class ComputationTypeFlyweightFactoryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationTypeFlyweightFactoryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FLYWEIGHT-FACTORY-BEAN";

  static initializeFlyweightInfrastructure(): {
    factory: ComputationTypeFlyweightFactoryImpl;
    registry: IFlyweightComputationTypeRegistry;
  } {
    if (registrySingleton === null) {
      registrySingleton = new ComputationTypeFlyweightRegistryImpl();
    }
    if (factorySingleton === null) {
      factorySingleton = new ComputationTypeFlyweightFactoryImpl(registrySingleton);
    }
    return {
      factory: factorySingleton,
      registry: registrySingleton,
    };
  }

  static getFactory(): ComputationTypeFlyweightFactoryImpl | null {
    return factorySingleton;
  }

  static getRegistry(): IFlyweightComputationTypeRegistry | null {
    return registrySingleton;
  }

  static getFactoryBeanName(): string {
    return ComputationTypeFlyweightFactoryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationTypeFlyweightFactoryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static isInfrastructureInitialized(): boolean {
    return factorySingleton !== null && registrySingleton !== null;
  }

  static resetInfrastructure(): void {
    factorySingleton = null;
    registrySingleton = null;
  }
}


import { ComputationPrototypeRegistryImpl } from "../impl/registry/ComputationPrototypeRegistryImpl.js";
import { DivisorBasedComputationPrototypeImpl } from "../impl/prototypes/DivisorBasedComputationPrototypeImpl.js";
import type { IComputationPrototypeRegistry } from "../contracts/IComputationPrototypeRegistry.js";

let registrySingleton: IComputationPrototypeRegistry | null = null;
let infrastructureInitialized = false;

export class ComputationPrototypeRegistryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationPrototypeRegistryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PROTOTYPE-FACTORY-BEAN";

  static initializePrototypeInfrastructure(): IComputationPrototypeRegistry {
    if (!infrastructureInitialized) {
      registrySingleton = new ComputationPrototypeRegistryImpl();
      const defaultPrototype = new DivisorBasedComputationPrototypeImpl();
      registrySingleton.registerPrototype(
        defaultPrototype.getPrototypeIdentifier(),
        defaultPrototype,
      );
      infrastructureInitialized = true;
    }
    return registrySingleton!;
  }

  static getRegistry(): IComputationPrototypeRegistry | null {
    return registrySingleton;
  }

  static isInfrastructureInitialized(): boolean {
    return infrastructureInitialized;
  }

  static getFactoryBeanName(): string {
    return ComputationPrototypeRegistryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationPrototypeRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetInfrastructure(): void {
    registrySingleton = null;
    infrastructureInitialized = false;
  }
}


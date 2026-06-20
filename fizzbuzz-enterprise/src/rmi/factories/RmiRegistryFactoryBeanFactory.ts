import type { IRmiRemoteInterface } from "../contracts/IRmiRemoteInterface.js";
import type { IRmiRemoteStub } from "../contracts/IRmiRemoteStub.js";
import type { IRmiRegistry } from "../contracts/IRmiRegistry.js";
import { FizzBuzzComputationRmiStubImpl } from "../impl/FizzBuzzComputationRmiStubImpl.js";
import { DefaultRmiRegistryImpl } from "../impl/DefaultRmiRegistryImpl.js";

export class RmiRegistryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "RmiRegistryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-RMI-FACTORY-BEAN";

  private static registry: IRmiRegistry | null = null;
  private static infrastructureInitialized = false;

  static getFactoryBeanName(): string {
    return RmiRegistryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return RmiRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static initializeRmiInfrastructure(): IRmiRegistry {
    if (RmiRegistryFactoryBeanFactory.registry === null) {
      RmiRegistryFactoryBeanFactory.registry = new DefaultRmiRegistryImpl();
    }
    RmiRegistryFactoryBeanFactory.infrastructureInitialized = true;
    return RmiRegistryFactoryBeanFactory.registry;
  }

  static getRegistry(): IRmiRegistry | null {
    return RmiRegistryFactoryBeanFactory.registry;
  }

  static isInfrastructureInitialized(): boolean {
    return RmiRegistryFactoryBeanFactory.infrastructureInitialized;
  }

  static bindRemoteObject(name: string, remoteObj: IRmiRemoteInterface): void {
    if (RmiRegistryFactoryBeanFactory.registry === null) {
      RmiRegistryFactoryBeanFactory.registry = new DefaultRmiRegistryImpl();
    }
    RmiRegistryFactoryBeanFactory.registry.bind(name, remoteObj);
  }

  static createStub(name: string): IRmiRemoteStub {
    if (RmiRegistryFactoryBeanFactory.registry === null) {
      throw new Error(
        `[${RmiRegistryFactoryBeanFactory.FACTORY_BEAN_NAME}] RMI registry not initialized`,
      );
    }
    const remoteObj = RmiRegistryFactoryBeanFactory.registry.lookup(name);
    return new FizzBuzzComputationRmiStubImpl(remoteObj);
  }
}

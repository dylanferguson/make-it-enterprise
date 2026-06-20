import type { IEnterpriseComputationResolutionAdapterRegistry } from "../contracts/IEnterpriseComputationResolutionAdapterRegistry.js";
import { DefaultComputationResolutionAdapterRegistryImpl } from "../impl/DefaultComputationResolutionAdapterRegistryImpl.js";

export class ComputationResolutionAdapterRegistryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationResolutionAdapterRegistryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-REGISTRY-FACTORY";
  private static registry: IEnterpriseComputationResolutionAdapterRegistry | null = null;
  private static registryInitialized = false;

  static createRegistry(autoInitialize: boolean = true): IEnterpriseComputationResolutionAdapterRegistry {
    if (this.registry === null) {
      this.registry = new DefaultComputationResolutionAdapterRegistryImpl();
      if (autoInitialize) {
        this.registryInitialized = true;
      }
    }
    return this.registry;
  }

  static getRegistry(): IEnterpriseComputationResolutionAdapterRegistry | null {
    return this.registry;
  }

  static isRegistryInitialized(): boolean {
    return this.registryInitialized && this.registry !== null;
  }

  static resetRegistry(): void {
    if (this.registry !== null) {
      this.registry.clearRegistry();
    }
    this.registry = null;
    this.registryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return this.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return this.FACTORY_BEAN_VERSION;
  }
}

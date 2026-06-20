import type { IEnterpriseTransactionSynchronizationRegistry } from "../contracts/IEnterpriseTransactionSynchronizationRegistry.js";
import { StandardEnterpriseTransactionSynchronizationRegistryImpl } from "../impl/StandardEnterpriseTransactionSynchronizationRegistryImpl.js";

const FACTORY_NAME = "EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory";
const FACTORY_VERSION = "1.0.0-SYNC-REGISTRY-FACTORY";

let registryInstance: IEnterpriseTransactionSynchronizationRegistry | null = null;

export class EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory {
  static createRegistry(): IEnterpriseTransactionSynchronizationRegistry {
    if (registryInstance === null) {
      registryInstance = new StandardEnterpriseTransactionSynchronizationRegistryImpl();
      console.debug(
        `[${FACTORY_NAME} v${FACTORY_VERSION}] ` +
        `Enterprise transaction synchronization registry created: ` +
        `name=[${registryInstance.getRegistryName()} v${registryInstance.getRegistryVersion()}]`,
      );
    }
    return registryInstance;
  }

  static getRegistry(): IEnterpriseTransactionSynchronizationRegistry | null {
    return registryInstance;
  }

  static resetRegistry(): void {
    registryInstance = null;
  }

  static isInitialized(): boolean {
    return registryInstance !== null;
  }

  static getFactoryName(): string {
    return FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return FACTORY_VERSION;
  }
}

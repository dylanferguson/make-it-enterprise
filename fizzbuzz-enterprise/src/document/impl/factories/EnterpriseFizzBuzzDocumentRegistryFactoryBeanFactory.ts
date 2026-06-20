import type { IEnterpriseFizzBuzzDocumentRegistry } from "../../contracts/IEnterpriseFizzBuzzDocumentRegistry.js";
import { EnterpriseFizzBuzzDocumentRegistryImpl } from "../EnterpriseFizzBuzzDocumentRegistryImpl.js";

export class EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DOCUMENT-REGISTRY-FACTORY-BEAN";

  private static singletonRegistry: EnterpriseFizzBuzzDocumentRegistryImpl | null = null;
  private static factoryInitialized = false;

  static initializeFactory(): boolean {
    if (EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.factoryInitialized) {
      return false;
    }
    EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.factoryInitialized = true;
    return true;
  }

  static createRegistry(): IEnterpriseFizzBuzzDocumentRegistry {
    const registry = new EnterpriseFizzBuzzDocumentRegistryImpl();
    console.debug(
      `[DocumentRegistryFactoryBean] Enterprise document registry created: ` +
      `registry=[${registry.getRegistryName()} v${registry.getRegistryVersion()}], ` +
      `factory=[${EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION}]`,
    );
    return registry;
  }

  static createSingletonRegistry(): IEnterpriseFizzBuzzDocumentRegistry {
    if (EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.singletonRegistry === null) {
      EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.singletonRegistry =
        new EnterpriseFizzBuzzDocumentRegistryImpl();
    }
    return EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.singletonRegistry;
  }

  static getRegistry(): IEnterpriseFizzBuzzDocumentRegistry | null {
    return EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.singletonRegistry;
  }

  static resetFactory(): void {
    EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.singletonRegistry = null;
    EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static isFactoryInitialized(): boolean {
    return EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.factoryInitialized;
  }
}

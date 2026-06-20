import type { ILocalizedMessageResolutionChainHandler } from "../../contracts/ILocalizedMessageResolutionChainHandler.js";
import { StandardLocalizedMessageResolutionChainHandlerImpl } from "../chain/StandardLocalizedMessageResolutionChainHandlerImpl.js";
import { ValidatingLocalizedMessageResolutionChainHandlerDecoratorImpl } from "../chain/ValidatingLocalizedMessageResolutionChainHandlerDecoratorImpl.js";
import { CachingLocalizedMessageResolutionChainHandlerDecoratorImpl } from "../chain/CachingLocalizedMessageResolutionChainHandlerDecoratorImpl.js";
import { LocalizedMessageResolutionChainHandlerRegistryImpl } from "../registry/LocalizedMessageResolutionChainHandlerRegistryImpl.js";

export const LocalizedMessageResolutionChainHandlerConfigurationProfile = {
  STANDARD: "STANDARD",
  VALIDATING: "VALIDATING",
  CACHING: "CACHING",
  FULL: "FULL",
} as const;

export type LocalizedMessageResolutionChainHandlerConfigurationProfile =
  (typeof LocalizedMessageResolutionChainHandlerConfigurationProfile)[keyof typeof LocalizedMessageResolutionChainHandlerConfigurationProfile];

export class LocalizedMessageResolutionChainHandlerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "LocalizedMessageResolutionChainHandlerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MESSAGE-CHAIN-FACTORY";

  private static singletonChainHead: ILocalizedMessageResolutionChainHandler | null = null;
  private static singletonRegistry: LocalizedMessageResolutionChainHandlerRegistryImpl | null = null;

  static createChainHandler(
    profile: LocalizedMessageResolutionChainHandlerConfigurationProfile = "STANDARD",
    resourceBundle?: Map<string, Map<string, string>>,
  ): ILocalizedMessageResolutionChainHandler {
    let chainHead: ILocalizedMessageResolutionChainHandler;
    const terminal = new StandardLocalizedMessageResolutionChainHandlerImpl(resourceBundle);

    switch (profile) {
      case "VALIDATING": {
        const validating = new ValidatingLocalizedMessageResolutionChainHandlerDecoratorImpl();
        validating.setNext(terminal);
        chainHead = validating;
        break;
      }
      case "CACHING": {
        const caching = new CachingLocalizedMessageResolutionChainHandlerDecoratorImpl();
        caching.setNext(terminal);
        chainHead = caching;
        break;
      }
      case "FULL": {
        const validating = new ValidatingLocalizedMessageResolutionChainHandlerDecoratorImpl();
        const caching = new CachingLocalizedMessageResolutionChainHandlerDecoratorImpl();
        validating.setNext(caching);
        caching.setNext(terminal);
        chainHead = validating;
        break;
      }
      default: {
        chainHead = terminal;
        break;
      }
    }

    const registry = new LocalizedMessageResolutionChainHandlerRegistryImpl();
    registry.registerHandler("validating", chainHead);

    if (LocalizedMessageResolutionChainHandlerFactoryBeanFactory.singletonChainHead === null) {
      LocalizedMessageResolutionChainHandlerFactoryBeanFactory.singletonChainHead = chainHead;
      LocalizedMessageResolutionChainHandlerFactoryBeanFactory.singletonRegistry = registry;
    }

    console.debug(
      `[${LocalizedMessageResolutionChainHandlerFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
      `Chain handler created for profile=${profile}: ${chainHead.getChainHandlerName()} v${chainHead.getChainHandlerVersion()}`,
    );

    return chainHead;
  }

  static getChainHead(): ILocalizedMessageResolutionChainHandler | null {
    return LocalizedMessageResolutionChainHandlerFactoryBeanFactory.singletonChainHead;
  }

  static getRegistry(): LocalizedMessageResolutionChainHandlerRegistryImpl | null {
    return LocalizedMessageResolutionChainHandlerFactoryBeanFactory.singletonRegistry;
  }

  static getFactoryBeanName(): string {
    return LocalizedMessageResolutionChainHandlerFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return LocalizedMessageResolutionChainHandlerFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetChain(): void {
    LocalizedMessageResolutionChainHandlerFactoryBeanFactory.singletonChainHead = null;
    LocalizedMessageResolutionChainHandlerFactoryBeanFactory.singletonRegistry = null;
  }
}

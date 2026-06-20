import type { ILocalizedMessageResolver } from "../../contracts/ILocalizedMessageResolver.js";
import type { ILocaleResolutionStrategy } from "../../contracts/ILocaleResolutionStrategy.js";
import type { ILocalizedMessageResolutionChainHandler } from "../../contracts/ILocalizedMessageResolutionChainHandler.js";
import { ResourceBundleBackedLocalizedMessageResolverImpl } from "../resolver/ResourceBundleBackedLocalizedMessageResolverImpl.js";
import { DefaultLocaleResolutionStrategyImpl } from "../locales/DefaultLocaleResolutionStrategyImpl.js";

export class LocalizedMessageResolverFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "LocalizedMessageResolverFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MESSAGE-RESOLVER-FACTORY";

  private static singletonResolver: ILocalizedMessageResolver | null = null;
  private static singletonLocaleStrategy: ILocaleResolutionStrategy | null = null;
  private static singletonChainHandler: ILocalizedMessageResolutionChainHandler | null = null;

  static createResolver(
    chainHandler: ILocalizedMessageResolutionChainHandler,
    localeStrategy?: ILocaleResolutionStrategy,
    supportedLocales?: readonly string[],
  ): ILocalizedMessageResolver {
    const effectiveLocaleStrategy = localeStrategy ?? new DefaultLocaleResolutionStrategyImpl();
    const resolver = new ResourceBundleBackedLocalizedMessageResolverImpl(
      chainHandler,
      effectiveLocaleStrategy,
      supportedLocales ?? ["en_US"],
    );

    if (LocalizedMessageResolverFactoryBeanFactory.singletonResolver === null) {
      LocalizedMessageResolverFactoryBeanFactory.singletonResolver = resolver;
      LocalizedMessageResolverFactoryBeanFactory.singletonLocaleStrategy = effectiveLocaleStrategy;
      LocalizedMessageResolverFactoryBeanFactory.singletonChainHandler = chainHandler;
    }

    console.debug(
      `[${LocalizedMessageResolverFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
      `Resolver created: ${resolver.getResolverName()} v${resolver.getResolverVersion()}, ` +
      `locales=[${resolver.getSupportedLocales().join(", ")}]`,
    );

    return resolver;
  }

  static getResolver(): ILocalizedMessageResolver | null {
    return LocalizedMessageResolverFactoryBeanFactory.singletonResolver;
  }

  static getLocaleStrategy(): ILocaleResolutionStrategy | null {
    return LocalizedMessageResolverFactoryBeanFactory.singletonLocaleStrategy;
  }

  static getChainHandler(): ILocalizedMessageResolutionChainHandler | null {
    return LocalizedMessageResolverFactoryBeanFactory.singletonChainHandler;
  }

  static getFactoryBeanName(): string {
    return LocalizedMessageResolverFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return LocalizedMessageResolverFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetResolver(): void {
    LocalizedMessageResolverFactoryBeanFactory.singletonResolver = null;
    LocalizedMessageResolverFactoryBeanFactory.singletonLocaleStrategy = null;
    LocalizedMessageResolverFactoryBeanFactory.singletonChainHandler = null;
  }
}

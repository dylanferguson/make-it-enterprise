import type { ILocaleResolutionStrategy } from "../../contracts/ILocaleResolutionStrategy.js";
import { DefaultLocaleResolutionStrategyImpl } from "../locales/DefaultLocaleResolutionStrategyImpl.js";
import { ThreadLocalLocaleResolutionStrategyImpl } from "../locales/ThreadLocalLocaleResolutionStrategyImpl.js";

export const LocaleResolutionStrategyType = {
  DEFAULT: "DEFAULT",
  THREAD_LOCAL: "THREAD_LOCAL",
} as const;

export type LocaleResolutionStrategyType =
  (typeof LocaleResolutionStrategyType)[keyof typeof LocaleResolutionStrategyType];

export class LocaleResolutionStrategyFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "LocaleResolutionStrategyFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-LOCALE-STRATEGY-FACTORY";

  private static singletonDefaultStrategy: ILocaleResolutionStrategy | null = null;
  private static singletonThreadLocalStrategy: ILocaleResolutionStrategy | null = null;

  static createLocaleResolutionStrategy(
    strategyType: LocaleResolutionStrategyType = "DEFAULT",
  ): ILocaleResolutionStrategy {
    switch (strategyType) {
      case "THREAD_LOCAL": {
        if (LocaleResolutionStrategyFactoryBeanFactory.singletonThreadLocalStrategy === null) {
          LocaleResolutionStrategyFactoryBeanFactory.singletonThreadLocalStrategy =
            new ThreadLocalLocaleResolutionStrategyImpl();
        }
        return LocaleResolutionStrategyFactoryBeanFactory.singletonThreadLocalStrategy;
      }
      case "DEFAULT":
      default: {
        if (LocaleResolutionStrategyFactoryBeanFactory.singletonDefaultStrategy === null) {
          LocaleResolutionStrategyFactoryBeanFactory.singletonDefaultStrategy =
            new DefaultLocaleResolutionStrategyImpl();
        }
        return LocaleResolutionStrategyFactoryBeanFactory.singletonDefaultStrategy;
      }
    }
  }

  static getDefaultStrategy(): ILocaleResolutionStrategy | null {
    return LocaleResolutionStrategyFactoryBeanFactory.singletonDefaultStrategy;
  }

  static getThreadLocalStrategy(): ILocaleResolutionStrategy | null {
    return LocaleResolutionStrategyFactoryBeanFactory.singletonThreadLocalStrategy;
  }

  static getFactoryBeanName(): string {
    return LocaleResolutionStrategyFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return LocaleResolutionStrategyFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetStrategies(): void {
    LocaleResolutionStrategyFactoryBeanFactory.singletonDefaultStrategy = null;
    LocaleResolutionStrategyFactoryBeanFactory.singletonThreadLocalStrategy = null;
  }
}

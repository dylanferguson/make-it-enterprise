import type { IFizzBuzzOutputStringResolutionStrategyProvider } from "../../contracts/index.js";
import type { IFizzBuzzOutputStringResolutionStrategyFactoryBean } from "../../contracts/index.js";
import { DefaultFizzBuzzOutputStringResolutionStrategyRegistryImpl } from "../registry/DefaultFizzBuzzOutputStringResolutionStrategyRegistryImpl.js";
import { DefaultFizzBuzzOutputStringResolutionChainHandlerImpl } from "../chain/DefaultFizzBuzzOutputStringResolutionChainHandlerImpl.js";
import { DivisibilityAnnotatedOutputStringStrategySelectionVisitorImpl } from "../visitor/DivisibilityAnnotatedOutputStringStrategySelectionVisitorImpl.js";
import { DefaultFizzBuzzOutputStringResolutionStrategyProviderImpl } from "../provider/DefaultFizzBuzzOutputStringResolutionStrategyProviderImpl.js";
import { FizzBuzzOutputStringResolutionStrategyImpl } from "../strategies/FizzBuzzOutputStringResolutionStrategyImpl.js";
import { FizzOutputStringResolutionStrategyImpl } from "../strategies/FizzOutputStringResolutionStrategyImpl.js";
import { BuzzOutputStringResolutionStrategyImpl } from "../strategies/BuzzOutputStringResolutionStrategyImpl.js";
import { NumberOutputStringResolutionStrategyImpl } from "../strategies/NumberOutputStringResolutionStrategyImpl.js";

export const FizzBuzzOutputStringResolutionStrategyFactoryConfigurationProfile = {
  STANDARD: "STANDARD",
  STRICT_VALIDATION: "STRICT_VALIDATION",
  HIGH_THROUGHPUT: "HIGH_THROUGHPUT",
} as const;

export type FizzBuzzOutputStringResolutionStrategyFactoryConfigurationProfile =
  (typeof FizzBuzzOutputStringResolutionStrategyFactoryConfigurationProfile)[keyof typeof FizzBuzzOutputStringResolutionStrategyFactoryConfigurationProfile];

const FACTORY_BEAN_NAME = "FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory";
const FACTORY_BEAN_VERSION = "1.0.0-OUTPUT-STRING-FACTORY";

let singletonProvider: IFizzBuzzOutputStringResolutionStrategyProvider | null = null;
let singletonProfile: FizzBuzzOutputStringResolutionStrategyFactoryConfigurationProfile | null = null;

class FizzBuzzOutputStringResolutionStrategyFactoryBeanImpl
  implements IFizzBuzzOutputStringResolutionStrategyFactoryBean
{
  private readonly factoryBeanName: string;
  private readonly factoryBeanVersion: string;
  private readonly isSingletonInstance: boolean;
  private provider: IFizzBuzzOutputStringResolutionStrategyProvider | null = null;

  constructor(
    factoryBeanName: string,
    factoryBeanVersion: string,
    isSingleton: boolean,
  ) {
    this.factoryBeanName = factoryBeanName;
    this.factoryBeanVersion = factoryBeanVersion;
    this.isSingletonInstance = isSingleton;
  }

  createProvider(): IFizzBuzzOutputStringResolutionStrategyProvider {
    if (this.isSingletonInstance && this.provider !== null) {
      return this.provider;
    }

    const registry = new DefaultFizzBuzzOutputStringResolutionStrategyRegistryImpl();
    const chainHandler = new DefaultFizzBuzzOutputStringResolutionChainHandlerImpl();
    const visitor = new DivisibilityAnnotatedOutputStringStrategySelectionVisitorImpl();

    const fizzBuzzStrategy = new FizzBuzzOutputStringResolutionStrategyImpl();
    const fizzStrategy = new FizzOutputStringResolutionStrategyImpl();
    const buzzStrategy = new BuzzOutputStringResolutionStrategyImpl();
    const numberStrategy = new NumberOutputStringResolutionStrategyImpl();

    chainHandler.registerStrategyHandler(fizzBuzzStrategy, 0);
    chainHandler.registerStrategyHandler(fizzStrategy, 1);
    chainHandler.registerStrategyHandler(buzzStrategy, 2);
    chainHandler.registerStrategyHandler(numberStrategy, 3);
    chainHandler.setFallbackStrategy(numberStrategy);

    registry.registerStrategy(fizzBuzzStrategy);
    registry.registerStrategy(fizzStrategy);
    registry.registerStrategy(buzzStrategy);
    registry.registerStrategy(numberStrategy);

    const provider = new DefaultFizzBuzzOutputStringResolutionStrategyProviderImpl(
      registry,
      chainHandler,
      visitor,
    );

    if (this.isSingletonInstance) {
      this.provider = provider;
    }

    return provider;
  }

  getFactoryBeanName(): string {
    return this.factoryBeanName;
  }

  getFactoryBeanVersion(): string {
    return this.factoryBeanVersion;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }

  destroyProvider(): void {
    this.provider = null;
  }
}

export class FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory {
  static createOutputStringResolutionFactoryBean(
    profile: FizzBuzzOutputStringResolutionStrategyFactoryConfigurationProfile = "STANDARD",
  ): IFizzBuzzOutputStringResolutionStrategyFactoryBean {
    console.debug(
      `[${FACTORY_BEAN_NAME}] Creating output string resolution factory bean for profile=${profile}`,
    );
    return new FizzBuzzOutputStringResolutionStrategyFactoryBeanImpl(
      `${FACTORY_BEAN_NAME}:${profile}`,
      FACTORY_BEAN_VERSION,
      true,
    );
  }

  static createProvider(
    profile: FizzBuzzOutputStringResolutionStrategyFactoryConfigurationProfile = "STANDARD",
  ): IFizzBuzzOutputStringResolutionStrategyProvider {
    if (
      singletonProvider === null ||
      singletonProfile !== profile
    ) {
      singletonProfile = profile;
      const factoryBean = FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory.createOutputStringResolutionFactoryBean(profile);
      singletonProvider = factoryBean.createProvider();
      console.debug(
        `[${FACTORY_BEAN_NAME}] Provider created with ` +
        `${singletonProvider.getRegisteredStrategyNames().length} registered strategies`,
      );
    }
    return singletonProvider;
  }

  static getProvider(): IFizzBuzzOutputStringResolutionStrategyProvider | null {
    return singletonProvider;
  }

  static getCurrentProfile(): FizzBuzzOutputStringResolutionStrategyFactoryConfigurationProfile | null {
    return singletonProfile;
  }

  static resetProvider(): void {
    singletonProvider = null;
    singletonProfile = null;
  }

  static getFactoryBeanName(): string {
    return FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FACTORY_BEAN_VERSION;
  }
}

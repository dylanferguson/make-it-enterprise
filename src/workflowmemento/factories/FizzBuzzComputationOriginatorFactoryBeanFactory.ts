import type { IFizzBuzzComputationOriginator } from "../contracts/IFizzBuzzComputationOriginator.js";
import { FizzBuzzComputationOriginatorImpl } from "../impl/FizzBuzzComputationOriginatorImpl.js";

export class FizzBuzzComputationOriginatorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "FizzBuzzComputationOriginatorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-ORIGINATOR-FACTORY-BEAN-FACTORY";

  private static originatorSingleton: IFizzBuzzComputationOriginator | null = null;

  static createOriginator(): IFizzBuzzComputationOriginator {
    if (FizzBuzzComputationOriginatorFactoryBeanFactory.originatorSingleton === null) {
      FizzBuzzComputationOriginatorFactoryBeanFactory.originatorSingleton =
        new FizzBuzzComputationOriginatorImpl();
    }
    return FizzBuzzComputationOriginatorFactoryBeanFactory.originatorSingleton;
  }

  static getOriginator(): IFizzBuzzComputationOriginator | null {
    return FizzBuzzComputationOriginatorFactoryBeanFactory.originatorSingleton;
  }

  static isInitialized(): boolean {
    return FizzBuzzComputationOriginatorFactoryBeanFactory.originatorSingleton !== null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzComputationOriginatorFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzComputationOriginatorFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}

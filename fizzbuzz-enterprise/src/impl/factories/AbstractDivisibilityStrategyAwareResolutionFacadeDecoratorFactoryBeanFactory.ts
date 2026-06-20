import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import { DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl } from "../decorators/DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl.js";

export class AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ADS-DECORATOR-FBF";

  private static decoratorSingleton: DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl | null = null;

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
  ): DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl {
    if (
      AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory
        .decoratorSingleton === null
    ) {
      AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory
        .decoratorSingleton =
        new DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl(wrappedFacade);
    }
    return AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory
      .decoratorSingleton;
  }

  static getDecorator(): DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl | null {
    return AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory
      .decoratorSingleton;
  }

  static resetDecorator(): void {
    AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory
      .decoratorSingleton = null;
  }

  static getFactoryBeanName(): string {
    return AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

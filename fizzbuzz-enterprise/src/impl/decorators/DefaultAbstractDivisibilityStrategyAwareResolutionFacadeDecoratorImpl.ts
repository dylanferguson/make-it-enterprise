import { AbstractBaseAbstractDivisibilityStrategyAwareResolutionFacadeDecorator } from "../../abstracts/AbstractBaseAbstractDivisibilityStrategyAwareResolutionFacadeDecorator.js";
import type { IAbstractDivisibilityStrategyProvider } from "../../abstractdivisibilitystrategyprovider/contracts/IAbstractDivisibilityStrategyProvider.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import { AbstractDivisibilityStrategyProviderFactoryBeanFactory } from "../../abstractdivisibilitystrategyprovider/factories/AbstractDivisibilityStrategyProviderFactoryBeanFactory.js";

export class DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseAbstractDivisibilityStrategyAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME =
    "DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-ADS-DECORATOR";

  private divisibilityEvaluationCount: number = 0;

  constructor(wrappedFacade: IFizzBuzzSingleValueResolutionFacade) {
    super(wrappedFacade);
  }

  resolveValue(value: number): string {
    const strategyProvider = this.getAbstractDivisibilityStrategyProvider();
    const registeredDivisors = strategyProvider.getRegisteredDivisors();
    for (const divisor of registeredDivisors) {
      const factoryBean = strategyProvider.resolveDivisibilityStrategyFactoryBean(divisor);
      const chainHandler = factoryBean.createChainHandler();
      this.divisibilityEvaluationCount++;
      const evaluatedDivisibility = chainHandler.evaluateDivisibility(
        value,
        divisor,
        (v: number, d: number) => v % d === 0,
      );
      if (evaluatedDivisibility) {
        break;
      }
    }
    return this.wrappedFacade.resolveValue(value);
  }

  resolveRange(start: number, end: number): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }

  getFacadeName(): string {
    return `${DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  getFacadeVersion(): string {
    return DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getAbstractDivisibilityStrategyProvider(): IAbstractDivisibilityStrategyProvider {
    const provider = AbstractDivisibilityStrategyProviderFactoryBeanFactory.getProvider();
    if (provider === null) {
      throw new Error(
        `[${DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}] ` +
        `AbstractDivisibilityStrategyProvider not initialized. ` +
        `Ensure AbstractDivisibilityStrategyProviderFactoryBeanFactory.initializeProviderInfrastructure() ` +
        `has been invoked during bootstrap.`,
      );
    }
    return provider;
  }

  getDivisibilityEvaluationCount(): number {
    return this.divisibilityEvaluationCount;
  }
}

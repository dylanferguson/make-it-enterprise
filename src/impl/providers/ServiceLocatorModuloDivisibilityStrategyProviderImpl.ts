import { AbstractBaseDivisibilityStrategyProvider } from "../../abstracts/AbstractBaseDivisibilityStrategyProvider.js";
import type { IDivisibilityStrategyResolutionHandler } from "../../contracts/IDivisibilityStrategyResolutionHandler.js";
import { FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory } from "../factories/FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.js";

export class ServiceLocatorModuloDivisibilityStrategyProviderImpl extends AbstractBaseDivisibilityStrategyProvider {
  private static readonly PROVIDER_NAME = "ServiceLocatorModuloDivisibilityStrategyProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-SERVICE-LOCATOR-AWARE";

  override checkDivisibility(
    dividend: number,
    divisor: number,
    evaluationContext: object | null,
  ): boolean {
    const context = evaluationContext !== null
      ? (evaluationContext as Record<string, unknown>).constructor?.name ?? "OBJECT_CONTEXT"
      : "NULL_CONTEXT";

    const resolvedHandlers = this.getResolvedHandlers();
    for (const handler of resolvedHandlers) {
      const result = handler.handleDivisibilityResolution(dividend, divisor);
      if (result.resolved) {
        return result.isDivisible;
      }
    }

    const resolver = FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.createResolver();
    const moduloResult = resolver.resolveModuloResult(dividend, divisor, context);
    return moduloResult === 0;
  }

  override getProviderName(): string {
    return ServiceLocatorModuloDivisibilityStrategyProviderImpl.PROVIDER_NAME;
  }

  override getProviderVersion(): string {
    return ServiceLocatorModuloDivisibilityStrategyProviderImpl.PROVIDER_VERSION;
  }

  protected override buildHandlerChain(): void {
    const handlers = this.getResolvedHandlers();
    for (let i = 0; i < handlers.length - 1; i++) {
      const current = handlers[i];
      const next = handlers[i + 1];
      if (current !== undefined && next !== undefined) {
        current.setNext(next);
      }
    }
  }
}

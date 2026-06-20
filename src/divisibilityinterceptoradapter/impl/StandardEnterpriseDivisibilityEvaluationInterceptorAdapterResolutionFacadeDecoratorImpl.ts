import { AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator } from "../abstracts/AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";

export class StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorImpl
  extends AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-DIV-INTERCEPT-DECORATOR";

  private readonly registeredDivisorCache: readonly number[];

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    interceptorAdapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
  ) {
    super(wrappedFacade, interceptorAdapter);
    this.registeredDivisorCache = interceptorAdapter.getRegisteredDivisors();
  }

  override resolveValue(value: number): string {
    this.assertValueInRange(value);
    this.interceptionCount++;
    const context = this.buildInterceptionContext(value);
    for (const divisor of this.registeredDivisorCache) {
      this.interceptorAdapter.interceptEvaluation(value, divisor, context);
    }
    return this.wrappedFacade.resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.assertValueInRange(start);
    this.assertValueInRange(end);
    if (end < start) {
      throw new Error(
        `[${StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorImpl.DECORATOR_NAME}] ` +
        `Range end [${end}] must be >= start [${start}]`,
      );
    }
    this.interceptionCount += (end - start + 1);
    return this.wrappedFacade.resolveRange(start, end);
  }

  override getFacadeName(): string {
    return `${StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorName(): string {
    return StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }
}

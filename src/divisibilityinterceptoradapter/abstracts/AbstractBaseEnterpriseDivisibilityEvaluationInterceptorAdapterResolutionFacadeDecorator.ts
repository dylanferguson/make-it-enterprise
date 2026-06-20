import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator.js";

export abstract class AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator
  implements IEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator
{
  protected static readonly INTERCEPTION_CONTEXT_PREFIX = "div:intercept:dec";

  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly interceptorAdapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter;
  protected interceptionCount: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    interceptorAdapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.interceptorAdapter = interceptorAdapter;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getInterceptorAdapter(): IEnterpriseDivisibilityEvaluationInterceptorAdapter {
    return this.interceptorAdapter;
  }

  isInterceptorAdapterEnabled(): boolean {
    return true;
  }

  getDecoratorInterceptionCount(): number {
    return this.interceptionCount;
  }

  protected buildInterceptionContext(value: number): string {
    return `${AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator.INTERCEPTION_CONTEXT_PREFIX}:${value}:${Date.now()}`;
  }

  protected assertValueInRange(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] ` +
        `Resolution value must be finite, received: ${value}`,
      );
    }
  }
}

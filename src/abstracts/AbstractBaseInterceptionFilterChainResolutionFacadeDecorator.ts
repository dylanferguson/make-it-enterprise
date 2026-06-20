import type { IFizzBuzzSingleValueResolutionFacade } from "../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationRequestInterceptionFilterChain } from "../contracts/IComputationRequestInterceptionFilter.js";
import type { IInterceptionFilterChainResolutionFacadeDecorator } from "../contracts/IInterceptionFilterChainResolutionFacadeDecorator.js";

export abstract class AbstractBaseInterceptionFilterChainResolutionFacadeDecorator
  implements IInterceptionFilterChainResolutionFacadeDecorator
{
  protected static readonly DECORATOR_FRAMEWORK_VERSION = "1.0.0-INTERCEPTION-FILTER-DECORATOR-FRAMEWORK";
  protected static readonly DEFAULT_FILTER_CHAIN_ENABLED = true;
  protected static readonly INTERCEPTION_FILTER_TIMEOUT_MS = 10000;

  protected readonly decoratedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly interceptionFilterChain: IComputationRequestInterceptionFilterChain;

  constructor(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    interceptionFilterChain: IComputationRequestInterceptionFilterChain,
  ) {
    if (decoratedFacade === null) {
      throw new Error(
        `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] Decorated facade must not be null`,
      );
    }
    if (interceptionFilterChain === null) {
      throw new Error(
        `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] Interception filter chain must not be null`,
      );
    }
    this.decoratedFacade = decoratedFacade;
    this.interceptionFilterChain = interceptionFilterChain;
  }

  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;
  abstract isFilterChainEnabled(): boolean;
  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];

  getDecoratedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.decoratedFacade;
  }

  getInterceptionFilterChain(): IComputationRequestInterceptionFilterChain {
    return this.interceptionFilterChain;
  }

  protected getDecoratorFrameworkVersion(): string {
    return AbstractBaseInterceptionFilterChainResolutionFacadeDecorator.DECORATOR_FRAMEWORK_VERSION;
  }

  protected getDefaultFilterChainEnabled(): boolean {
    return AbstractBaseInterceptionFilterChainResolutionFacadeDecorator.DEFAULT_FILTER_CHAIN_ENABLED;
  }

  protected getInterceptionFilterTimeoutMs(): number {
    return AbstractBaseInterceptionFilterChainResolutionFacadeDecorator.INTERCEPTION_FILTER_TIMEOUT_MS;
  }

  protected createInterceptionContextId(value: number): string {
    return `ifl:dec:ctx:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }
}

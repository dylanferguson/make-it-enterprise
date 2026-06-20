import type { IFizzBuzzSingleValueResolutionFacade } from "../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IValidationAwareResolutionFacadeDecorator } from "../contracts/IValidationAwareResolutionFacadeDecorator.js";

export abstract class AbstractBaseValidationAwareResolutionFacadeDecorator
  implements IValidationAwareResolutionFacadeDecorator
{
  protected static readonly DECORATOR_FRAMEWORK_VERSION = "1.0.0-VALIDATION-AWARE-DECORATOR-FRAMEWORK";
  protected static readonly DEFAULT_VALIDATION_ENABLED = true;
  protected static readonly VALIDATION_TIMEOUT_MS = 5000;

  protected readonly decoratedFacade: IFizzBuzzSingleValueResolutionFacade;

  constructor(decoratedFacade: IFizzBuzzSingleValueResolutionFacade) {
    if (decoratedFacade === null) {
      throw new Error(
        `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] Decorated facade must not be null`,
      );
    }
    this.decoratedFacade = decoratedFacade;
  }

  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;
  abstract isValidationEnabled(): boolean;
  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];

  getDecoratedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.decoratedFacade;
  }

  protected getDecoratorFrameworkVersion(): string {
    return AbstractBaseValidationAwareResolutionFacadeDecorator.DECORATOR_FRAMEWORK_VERSION;
  }

  protected getDefaultValidationEnabled(): boolean {
    return AbstractBaseValidationAwareResolutionFacadeDecorator.DEFAULT_VALIDATION_ENABLED;
  }

  protected getValidationTimeoutMs(): number {
    return AbstractBaseValidationAwareResolutionFacadeDecorator.VALIDATION_TIMEOUT_MS;
  }

  protected createValidationContextId(value: number): string {
    return `val:aware:dec:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }
}

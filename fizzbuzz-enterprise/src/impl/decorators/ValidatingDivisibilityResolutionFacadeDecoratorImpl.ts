import { AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator } from "../../abstracts/AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export class ValidatingDivisibilityResolutionFacadeDecoratorImpl
  extends AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "ValidatingDivisibilityResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-DIVISIBILITY-DECORATOR";

  private validationFailures: number = 0;

  constructor(wrappedFacade: IEnterpriseDivisibilityResolutionFacade) {
    super(wrappedFacade);
  }

  override isDivisible(dividend: number, divisor: number): boolean {
    if (!Number.isFinite(dividend) || !Number.isFinite(divisor)) {
      this.validationFailures++;
      return false;
    }
    if (divisor === 0) {
      this.validationFailures++;
      return false;
    }
    if (dividend < 0) {
      this.validationFailures++;
      return this.wrappedFacade.isDivisible(Math.abs(dividend), divisor);
    }
    return this.wrappedFacade.isDivisible(dividend, divisor);
  }

  override getFacadeName(): string {
    return `${ValidatingDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return ValidatingDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getResolutionStrategyDescription(): string {
    return `Validating wrapper around: ${this.wrappedFacade.getResolutionStrategyDescription()}`;
  }

  override getDecoratorName(): string {
    return ValidatingDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return ValidatingDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getValidationFailures(): number {
    return this.validationFailures;
  }
}

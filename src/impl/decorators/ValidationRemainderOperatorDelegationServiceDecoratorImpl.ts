import { AbstractBaseRemainderOperatorDelegationServiceDecorator } from "../../abstracts/AbstractBaseRemainderOperatorDelegationServiceDecorator.js";
import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";

export class ValidationRemainderOperatorDelegationServiceDecoratorImpl
  extends AbstractBaseRemainderOperatorDelegationServiceDecorator
{
  private static readonly DECORATOR_NAME = "ValidationRemainderOperatorDelegationServiceDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-RELEASE";

  constructor(decoratedService: IRemainderOperatorDelegationService) {
    super(decoratedService);
  }

  override computeRemainder(dividend: number, divisor: number): number {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.getDecoratorName()}] Dividend validation failed: ${dividend}`,
      );
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(
        `[${this.getDecoratorName()}] Divisor validation failed: ${divisor}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.getDecoratorName()}] Division by zero intercepted by decorator`,
      );
    }
    return this.decoratedService.computeRemainder(dividend, divisor);
  }

  override getDecoratorName(): string {
    return ValidationRemainderOperatorDelegationServiceDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return ValidationRemainderOperatorDelegationServiceDecoratorImpl.DECORATOR_VERSION;
  }
}

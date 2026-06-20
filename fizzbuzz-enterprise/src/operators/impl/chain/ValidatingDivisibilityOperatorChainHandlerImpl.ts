import { AbstractBaseDivisibilityOperatorDelegationChainHandler } from "../../abstracts/AbstractBaseDivisibilityOperatorDelegationChainHandler.js";

export class ValidatingDivisibilityOperatorChainHandlerImpl
  extends AbstractBaseDivisibilityOperatorDelegationChainHandler
{
  private static readonly HANDLER_NAME = "ValidatingDivisibilityOperatorChainHandler";
  private static readonly HANDLER_VERSION = "1.0.0-VALIDATING-CHAIN-HANDLER";
  private static readonly HANDLER_PRIORITY = 2000;

  private validationCount: number = 0;
  private rejectionCount: number = 0;

  constructor() {
    super(
      ValidatingDivisibilityOperatorChainHandlerImpl.HANDLER_NAME,
      ValidatingDivisibilityOperatorChainHandlerImpl.HANDLER_VERSION,
      ValidatingDivisibilityOperatorChainHandlerImpl.HANDLER_PRIORITY,
    );
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return true;
  }

  override evaluateDivisibility(dividend: number, divisor: number): boolean {
    this.validateOperands(dividend, divisor);
    if (dividend < 0) {
      this.rejectionCount++;
      return false;
    }
    if (!Number.isInteger(dividend)) {
      this.rejectionCount++;
      return false;
    }
    this.validationCount++;
    if (this.getNextHandler() === null) {
      return false;
    }
    return this.proceedToNext(dividend, divisor);
  }

  getValidationCount(): number {
    return this.validationCount;
  }

  getRejectionCount(): number {
    return this.rejectionCount;
  }
}

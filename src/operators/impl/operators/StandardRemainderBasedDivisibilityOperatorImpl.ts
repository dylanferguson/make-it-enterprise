import { AbstractBaseDivisibilityOperator } from "../../abstracts/AbstractBaseDivisibilityOperator.js";

export class StandardRemainderBasedDivisibilityOperatorImpl extends AbstractBaseDivisibilityOperator {
  private static readonly OPERATOR_NAME = "StandardRemainderBasedDivisibilityOperator";
  private static readonly OPERATOR_VERSION = "1.0.0-REMAINDER-BASED-OPERATOR";

  constructor() {
    super(
      StandardRemainderBasedDivisibilityOperatorImpl.OPERATOR_NAME,
      StandardRemainderBasedDivisibilityOperatorImpl.OPERATOR_VERSION,
    );
  }

  override isDivisibleBy(dividend: number, divisor: number): boolean {
    this.validateOperands(dividend, divisor);
    if (divisor === 0) {
      return false;
    }
    return dividend % divisor === 0;
  }
}

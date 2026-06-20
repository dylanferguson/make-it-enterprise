import type { IDivisibilityOperator } from "../contracts/IDivisibilityOperator.js";

export abstract class AbstractBaseDivisibilityOperator implements IDivisibilityOperator {
  private static readonly DEFAULT_OPERATOR_NAME = "AbstractBaseDivisibilityOperator";
  private static readonly DEFAULT_OPERATOR_VERSION = "1.0.0-BASE-OPERATOR";

  private readonly operatorName: string;
  private readonly operatorVersion: string;

  constructor(
    operatorName: string = AbstractBaseDivisibilityOperator.DEFAULT_OPERATOR_NAME,
    operatorVersion: string = AbstractBaseDivisibilityOperator.DEFAULT_OPERATOR_VERSION,
  ) {
    this.operatorName = operatorName;
    this.operatorVersion = operatorVersion;
  }

  getOperatorName(): string {
    return this.operatorName;
  }

  getOperatorVersion(): string {
    return this.operatorVersion;
  }

  abstract isDivisibleBy(dividend: number, divisor: number): boolean;

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.operatorName}] Dividend must be finite, received: ${dividend}`,
      );
    }
    if (!Number.isInteger(dividend)) {
      throw new Error(
        `[${this.operatorName}] Dividend must be an integer, received: ${dividend}`,
      );
    }
    if (dividend < 0) {
      throw new Error(
        `[${this.operatorName}] Negative dividend not supported: ${dividend}`,
      );
    }
  }
}

import type { IRemainderOperatorDelegationService } from "../contracts/IRemainderOperatorDelegationService.js";

export abstract class AbstractBaseRemainderOperatorDelegationService
  implements IRemainderOperatorDelegationService
{
  abstract computeRemainder(dividend: number, divisor: number): number;
  abstract getDelegationServiceName(): string;
  abstract getDelegationServiceVersion(): string;
  abstract supportsOperands(dividend: number, divisor: number): boolean;

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.getDelegationServiceName()}] Dividend must be finite, received: ${dividend}`,
      );
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(
        `[${this.getDelegationServiceName()}] Divisor must be finite, received: ${divisor}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.getDelegationServiceName()}] Division by zero is not permitted`,
      );
    }
  }

  protected truncateToInteger(value: number): number {
    return Math.trunc(value);
  }

  protected templateMethodComputeRemainder(dividend: number, divisor: number): number {
    this.validateOperands(dividend, divisor);
    const truncatedDividend = this.truncateToInteger(dividend);
    const truncatedDivisor = this.truncateToInteger(divisor);
    const rawResult = this.doComputeRemainder(truncatedDividend, truncatedDivisor);
    return this.postProcessRemainderResult(rawResult, dividend, divisor);
  }

  protected abstract doComputeRemainder(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number;

  protected postProcessRemainderResult(
    result: number,
    _originalDividend: number,
    _originalDivisor: number,
  ): number {
    return result;
  }
}

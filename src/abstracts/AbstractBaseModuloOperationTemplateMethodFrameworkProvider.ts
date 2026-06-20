import type { IModuloOperationTemplateMethodFrameworkProvider } from "../contracts/IModuloOperationTemplateMethodFrameworkProvider.js";

export abstract class AbstractBaseModuloOperationTemplateMethodFrameworkProvider
  implements IModuloOperationTemplateMethodFrameworkProvider
{
  abstract executeModuloOperation(
    dividend: number,
    divisor: number,
    operationName: string,
  ): number;
  abstract getFrameworkName(): string;
  abstract getFrameworkVersion(): string;
  abstract isOperationSupported(dividend: number, divisor: number): boolean;

  protected templateMethodExecuteOperation(
    dividend: number,
    divisor: number,
  ): number {
    this.preProcessInputs(dividend, divisor);
    const truncatedDividend = this.truncateToInteger(dividend);
    const truncatedDivisor = this.truncateToInteger(divisor);
    this.validateProcessedInputs(truncatedDividend, truncatedDivisor);
    const rawResult = this.doExecuteOperation(truncatedDividend, truncatedDivisor);
    const postProcessed = this.postProcessOperationResult(
      rawResult,
      truncatedDividend,
      truncatedDivisor,
    );
    return this.finalizeResult(postProcessed, dividend, divisor);
  }

  protected preProcessInputs(_dividend: number, _divisor: number): void {
  }

  protected validateProcessedInputs(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): void {
    if (!Number.isFinite(truncatedDividend)) {
      throw new Error(
        `[${this.getFrameworkName()}] Truncated dividend must be finite, received: ${truncatedDividend}`,
      );
    }
    if (!Number.isFinite(truncatedDivisor)) {
      throw new Error(
        `[${this.getFrameworkName()}] Truncated divisor must be finite, received: ${truncatedDivisor}`,
      );
    }
    if (truncatedDivisor === 0) {
      throw new Error(
        `[${this.getFrameworkName()}] Division by zero is not permitted`,
      );
    }
  }

  protected abstract doExecuteOperation(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number;

  protected postProcessOperationResult(
    result: number,
    _truncatedDividend: number,
    _truncatedDivisor: number,
  ): number {
    return result;
  }

  protected finalizeResult(
    result: number,
    _originalDividend: number,
    _originalDivisor: number,
  ): number {
    return result;
  }

  private truncateToInteger(value: number): number {
    return Math.trunc(value);
  }
}

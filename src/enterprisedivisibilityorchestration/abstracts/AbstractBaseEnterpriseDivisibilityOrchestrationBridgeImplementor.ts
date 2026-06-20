import type { IEnterpriseDivisibilityOrchestrationBridgeImplementor } from "../contracts/IEnterpriseDivisibilityOrchestrationBridgeImplementor.js";

export abstract class AbstractBaseEnterpriseDivisibilityOrchestrationBridgeImplementor
  implements IEnterpriseDivisibilityOrchestrationBridgeImplementor
{
  private readonly implementorName: string;
  private readonly implementorVersion: string;

  constructor(implementorName: string, implementorVersion: string) {
    this.implementorName = implementorName;
    this.implementorVersion = implementorVersion;
  }

  getImplementorName(): string {
    return this.implementorName;
  }

  getImplementorVersion(): string {
    return this.implementorVersion;
  }

  abstract computeRemainder(dividend: number, divisor: number): number;

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.implementorName}] Dividend must be finite, received: ${dividend}`,
      );
    }
    if (!Number.isInteger(dividend)) {
      throw new Error(
        `[${this.implementorName}] Dividend must be an integer, received: ${dividend}`,
      );
    }
    if (dividend < 0) {
      throw new Error(
        `[${this.implementorName}] Negative dividend not supported: ${dividend}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.implementorName}] Division by zero intercepted at bridge implementor layer`,
      );
    }
  }
}

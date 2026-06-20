import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy.js";

export abstract class AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy
  implements IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy
{
  protected abstract readonly strategyName: string;
  protected abstract readonly strategyVersion: string;
  protected abstract readonly strategyDivisor: number;
  protected readonly enabled: boolean = true;

  abstract resolveInterceptedRemainder(
    dividend: number,
    divisor: number,
    context: string | null,
  ): number;

  getStrategyName(): string {
    return this.strategyName;
  }

  getStrategyVersion(): string {
    return this.strategyVersion;
  }

  getStrategyDivisor(): number {
    return this.strategyDivisor;
  }

  isStrategyEnabled(): boolean {
    return this.enabled;
  }

  protected assertValidOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.strategyName} v${this.strategyVersion}] ` +
        `Invalid dividend: [${dividend}]. Must be a finite number.`,
      );
    }
    if (!Number.isFinite(divisor) || divisor === 0) {
      throw new Error(
        `[${this.strategyName} v${this.strategyVersion}] ` +
        `Invalid divisor: [${divisor}]. Must be a finite non-zero number.`,
      );
    }
  }
}

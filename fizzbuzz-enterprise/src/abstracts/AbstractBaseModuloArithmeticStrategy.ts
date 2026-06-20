import type { IModuloArithmeticStrategy } from "../contracts/IModuloArithmeticStrategy.js";

export abstract class AbstractBaseModuloArithmeticStrategy implements IModuloArithmeticStrategy {
  abstract computeModulo(dividend: number, divisor: number): number;
  abstract getArithmeticStrategyName(): string;

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(`Dividend must be finite, received: ${dividend}`);
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(`Divisor must be finite, received: ${divisor}`);
    }
    if (divisor === 0) {
      throw new Error("Division by zero is not permitted");
    }
  }

  protected truncateToInteger(value: number): number {
    return Math.trunc(value);
  }
}

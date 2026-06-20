import type { IFizzBuzzExpression } from "../contracts/IFizzBuzzExpression.js";

export abstract class AbstractBaseFizzBuzzExpression implements IFizzBuzzExpression {
  abstract interpret(value: number): boolean;
  abstract getExpressionType(): string;
  abstract getExpressionCanonicalForm(): string;

  protected validateOperand(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.getExpressionType()}] Expression operand must be finite, received: ${value}`,
      );
    }
    if (value < 0) {
      throw new Error(
        `[${this.getExpressionType()}] Expression operand must be non-negative, received: ${value}`,
      );
    }
  }
}


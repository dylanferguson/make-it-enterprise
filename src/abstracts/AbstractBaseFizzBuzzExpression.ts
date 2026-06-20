import type { IFizzBuzzExpression } from "../contracts/IFizzBuzzExpression.js";
import type { IFizzBuzzExpressionVisitor } from "../contracts/IFizzBuzzExpressionVisitor.js";

export abstract class AbstractBaseFizzBuzzExpression implements IFizzBuzzExpression {
  abstract interpret(value: number): boolean;
  abstract getExpressionType(): string;
  abstract getExpressionCanonicalForm(): string;
  abstract accept(visitor: IFizzBuzzExpressionVisitor): void;

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


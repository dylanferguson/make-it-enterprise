import { AbstractBaseFizzBuzzExpression } from "../../abstracts/AbstractBaseFizzBuzzExpression.js";
import { ExpressionEvaluationException } from "../../exceptions/ExpressionEvaluationException.js";

export class DivisibleByExpressionImpl extends AbstractBaseFizzBuzzExpression {
  private static readonly EXPRESSION_TYPE = "DivisibleByExpression";
  private readonly divisor: number;

  constructor(divisor: number) {
    super();
    if (!Number.isFinite(divisor) || divisor <= 0) {
      throw new Error(
        `DivisibleByExpression divisor must be a positive finite number, received: ${divisor}`,
      );
    }
    this.divisor = Math.trunc(divisor);
  }

  getDivisor(): number {
    return this.divisor;
  }

  override interpret(value: number): boolean {
    this.validateOperand(value);
    try {
      const truncatedValue = Math.trunc(value);
      const quotient = Math.trunc(truncatedValue / this.divisor);
      const remainder = truncatedValue - quotient * this.divisor;
      return remainder === 0;
    } catch (error) {
      throw new ExpressionEvaluationException(
        error instanceof Error ? error.message : String(error),
        this.getExpressionType(),
        value,
        error instanceof Error ? error : null,
      );
    }
  }

  override getExpressionType(): string {
    return DivisibleByExpressionImpl.EXPRESSION_TYPE;
  }

  override getExpressionCanonicalForm(): string {
    return `DivisibleBy(${this.divisor})`;
  }
}


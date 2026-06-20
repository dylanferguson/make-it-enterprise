import { AbstractBaseFizzBuzzExpression } from "../../abstracts/AbstractBaseFizzBuzzExpression.js";
import type { IFizzBuzzExpression } from "../../contracts/IFizzBuzzExpression.js";
import { ExpressionEvaluationException } from "../../exceptions/ExpressionEvaluationException.js";

export class NotExpressionImpl extends AbstractBaseFizzBuzzExpression {
  private static readonly EXPRESSION_TYPE = "NotExpression";
  private readonly inner: IFizzBuzzExpression;

  constructor(inner: IFizzBuzzExpression) {
    super();
    this.inner = inner;
  }

  getInnerExpression(): IFizzBuzzExpression {
    return this.inner;
  }

  override interpret(value: number): boolean {
    this.validateOperand(value);
    try {
      return !this.inner.interpret(value);
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
    return NotExpressionImpl.EXPRESSION_TYPE;
  }

  override getExpressionCanonicalForm(): string {
    return `Not(${this.inner.getExpressionCanonicalForm()})`;
  }
}


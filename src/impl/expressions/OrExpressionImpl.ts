import { AbstractBaseFizzBuzzExpression } from "../../abstracts/AbstractBaseFizzBuzzExpression.js";
import type { IFizzBuzzExpression } from "../../contracts/IFizzBuzzExpression.js";
import { ExpressionEvaluationException } from "../../exceptions/ExpressionEvaluationException.js";

export class OrExpressionImpl extends AbstractBaseFizzBuzzExpression {
  private static readonly EXPRESSION_TYPE = "OrExpression";
  private readonly left: IFizzBuzzExpression;
  private readonly right: IFizzBuzzExpression;

  constructor(left: IFizzBuzzExpression, right: IFizzBuzzExpression) {
    super();
    this.left = left;
    this.right = right;
  }

  getLeftExpression(): IFizzBuzzExpression {
    return this.left;
  }

  getRightExpression(): IFizzBuzzExpression {
    return this.right;
  }

  override interpret(value: number): boolean {
    this.validateOperand(value);
    try {
      return this.left.interpret(value) || this.right.interpret(value);
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
    return OrExpressionImpl.EXPRESSION_TYPE;
  }

  override getExpressionCanonicalForm(): string {
    return `Or(${this.left.getExpressionCanonicalForm()}, ${this.right.getExpressionCanonicalForm()})`;
  }
}


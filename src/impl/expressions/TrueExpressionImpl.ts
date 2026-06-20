import { AbstractBaseFizzBuzzExpression } from "../../abstracts/AbstractBaseFizzBuzzExpression.js";

export class TrueExpressionImpl extends AbstractBaseFizzBuzzExpression {
  private static readonly EXPRESSION_TYPE = "TrueExpression";

  override interpret(value: number): boolean {
    this.validateOperand(value);
    return true;
  }

  override getExpressionType(): string {
    return TrueExpressionImpl.EXPRESSION_TYPE;
  }

  override getExpressionCanonicalForm(): string {
    return "True";
  }
}


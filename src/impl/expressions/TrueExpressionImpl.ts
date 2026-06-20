import { AbstractBaseFizzBuzzExpression } from "../../abstracts/AbstractBaseFizzBuzzExpression.js";
import type { IFizzBuzzExpressionVisitor } from "../../contracts/IFizzBuzzExpressionVisitor.js";

export class TrueExpressionImpl extends AbstractBaseFizzBuzzExpression {
  private static readonly EXPRESSION_TYPE = "TrueExpression";

  override interpret(value: number): boolean {
    this.validateOperand(value);
    return true;
  }

  override getExpressionType(): string {
    return TrueExpressionImpl.EXPRESSION_TYPE;
  }

  override accept(visitor: IFizzBuzzExpressionVisitor): void {
    visitor.visitTrue(this);
  }

  override getExpressionCanonicalForm(): string {
    return "True";
  }
}


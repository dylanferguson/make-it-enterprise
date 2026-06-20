import { AbstractBaseCompositeDivisibilityExpression } from "../../abstracts/AbstractBaseCompositeDivisibilityExpression.js";
import type { ICompositeDivisibilityExpressionVisitor } from "../../contracts/index.js";

export class ValueExpressionImpl extends AbstractBaseCompositeDivisibilityExpression {
  private readonly value: number;

  constructor(value: number) {
    super("VALUE_EXPRESSION", `ValueExpression[${value}]`);
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  accept(visitor: ICompositeDivisibilityExpressionVisitor): void {
    visitor.visitValue(this);
  }
}

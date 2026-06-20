import { AbstractBaseCompositeDivisibilityExpression } from "../../abstracts/AbstractBaseCompositeDivisibilityExpression.js";
import type { ICompositeDivisibilityExpression, ICompositeDivisibilityExpressionVisitor } from "../../contracts/index.js";

export class OrCompositeExpressionImpl extends AbstractBaseCompositeDivisibilityExpression {
  private readonly left: ICompositeDivisibilityExpression;
  private readonly right: ICompositeDivisibilityExpression;

  constructor(left: ICompositeDivisibilityExpression, right: ICompositeDivisibilityExpression) {
    super(
      "OR_COMPOSITE_EXPRESSION",
      `OrCompositeExpression[${left.getExpressionDescriptor()} || ${right.getExpressionDescriptor()}]`,
      [left, right],
    );
    this.left = left;
    this.right = right;
  }

  getLeft(): ICompositeDivisibilityExpression {
    return this.left;
  }

  getRight(): ICompositeDivisibilityExpression {
    return this.right;
  }

  accept(visitor: ICompositeDivisibilityExpressionVisitor): void {
    visitor.visitOr(this);
  }
}

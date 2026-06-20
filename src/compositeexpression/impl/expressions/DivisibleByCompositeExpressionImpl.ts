import { AbstractBaseCompositeDivisibilityExpression } from "../../abstracts/AbstractBaseCompositeDivisibilityExpression.js";
import type { ICompositeDivisibilityExpression, ICompositeDivisibilityExpressionVisitor } from "../../contracts/index.js";

export class DivisibleByCompositeExpressionImpl extends AbstractBaseCompositeDivisibilityExpression {
  private readonly inputValue: number;
  private readonly divisor: number;

  constructor(inputValue: number, divisor: number) {
    super(
      "DIVISIBLE_BY_EXPRESSION",
      `DivisibleByExpression[${inputValue} % ${divisor} === 0]`,
    );
    this.inputValue = inputValue;
    this.divisor = divisor;
  }

  getInputValue(): number {
    return this.inputValue;
  }

  getDivisor(): number {
    return this.divisor;
  }

  accept(visitor: ICompositeDivisibilityExpressionVisitor): void {
    visitor.visitDivisibleBy(this);
  }
}

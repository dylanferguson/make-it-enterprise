import type { ICompositeDivisibilityExpression, ICompositeDivisibilityExpressionVisitor } from "../contracts/index.js";

export abstract class AbstractBaseCompositeDivisibilityExpression
  implements ICompositeDivisibilityExpression
{
  private readonly expressionType: string;
  private readonly expressionDescriptor: string;
  private readonly childExpressions: readonly ICompositeDivisibilityExpression[];

  constructor(
    expressionType: string,
    expressionDescriptor: string,
    childExpressions: ICompositeDivisibilityExpression[] = [],
  ) {
    this.expressionType = expressionType;
    this.expressionDescriptor = expressionDescriptor;
    this.childExpressions = Object.freeze([...childExpressions]);
  }

  getExpressionType(): string {
    return this.expressionType;
  }

  getExpressionDescriptor(): string {
    return this.expressionDescriptor;
  }

  getChildExpressions(): readonly ICompositeDivisibilityExpression[] {
    return this.childExpressions;
  }

  isComposite(): boolean {
    return this.childExpressions.length > 0;
  }

  abstract accept(visitor: ICompositeDivisibilityExpressionVisitor): void;
}

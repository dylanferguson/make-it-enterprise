import type { ICompositeDivisibilityExpressionVisitor, ICompositeDivisibilityExpression, ICompositeDivisibilityExpressionEvaluationContext } from "../contracts/index.js";

export abstract class AbstractBaseCompositeDivisibilityExpressionVisitor
  implements ICompositeDivisibilityExpressionVisitor
{
  private readonly visitorName: string;
  private readonly visitorVersion: string;
  protected evaluationContext: ICompositeDivisibilityExpressionEvaluationContext | null = null;

  constructor(visitorName: string, visitorVersion: string) {
    this.visitorName = visitorName;
    this.visitorVersion = visitorVersion;
  }

  getVisitorName(): string {
    return this.visitorName;
  }

  getVisitorVersion(): string {
    return this.visitorVersion;
  }

  abstract visitExpression(expression: ICompositeDivisibilityExpression): void;
  abstract visitDivisibleBy(expression: ICompositeDivisibilityExpression): void;
  abstract visitAnd(expression: ICompositeDivisibilityExpression): void;
  abstract visitOr(expression: ICompositeDivisibilityExpression): void;
  abstract visitValue(expression: ICompositeDivisibilityExpression): void;
  abstract getEvaluationContext(): ICompositeDivisibilityExpressionEvaluationContext;
  abstract reset(): void;
}

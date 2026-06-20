import type { ICompositeDivisibilityExpression, ICompositeDivisibilityExpressionEvaluationOutcome, ICompositeDivisibilityExpressionVisitor, ICompositeDivisibilityExpressionInterpreter } from "../contracts/index.js";

export abstract class AbstractBaseCompositeDivisibilityExpressionInterpreter
  implements ICompositeDivisibilityExpressionInterpreter
{
  private readonly interpreterName: string;
  private readonly interpreterVersion: string;
  protected readonly visitor: ICompositeDivisibilityExpressionVisitor;

  constructor(
    interpreterName: string,
    interpreterVersion: string,
    visitor: ICompositeDivisibilityExpressionVisitor,
  ) {
    this.interpreterName = interpreterName;
    this.interpreterVersion = interpreterVersion;
    this.visitor = visitor;
  }

  getInterpreterName(): string {
    return this.interpreterName;
  }

  getInterpreterVersion(): string {
    return this.interpreterVersion;
  }

  getVisitor(): ICompositeDivisibilityExpressionVisitor {
    return this.visitor;
  }

  abstract interpret(expression: ICompositeDivisibilityExpression): ICompositeDivisibilityExpressionEvaluationOutcome;
}

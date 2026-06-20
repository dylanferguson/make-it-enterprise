import { AbstractBaseCompositeDivisibilityExpressionVisitor } from "../../abstracts/AbstractBaseCompositeDivisibilityExpressionVisitor.js";
import { AbstractBaseCompositeDivisibilityExpressionEvaluationContext } from "../../abstracts/AbstractBaseCompositeDivisibilityExpressionEvaluationContext.js";
import type { ICompositeDivisibilityExpression, ICompositeDivisibilityExpressionEvaluationContext } from "../../contracts/index.js";
import type { DivisibleByCompositeExpressionImpl } from "../expressions/DivisibleByCompositeExpressionImpl.js";
import type { AndCompositeExpressionImpl } from "../expressions/AndCompositeExpressionImpl.js";
import type { OrCompositeExpressionImpl } from "../expressions/OrCompositeExpressionImpl.js";
import type { ValueExpressionImpl } from "../expressions/ValueExpressionImpl.js";

class StandardCompositeDivisibilityExpressionEvaluationContextImpl
  extends AbstractBaseCompositeDivisibilityExpressionEvaluationContext
{
  constructor(inputValue: number) {
    super(inputValue);
  }

  getEvaluationDescriptor(): string {
    return `CompositeEvaluationContext[input=${this.getInputValue()},divisors=[${Array.from(this.getConsolidatedDivisibilityMap().entries()).map(([k, v]) => `${k}:${v}`).join(",")}]]`;
  }
}

export class CompositeDivisibilityExpressionTraversalVisitorImpl
  extends AbstractBaseCompositeDivisibilityExpressionVisitor
{
  private static readonly VISITOR_NAME = "CompositeDivisibilityExpressionTraversalVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-COMPOSITE-INTERPRETER-VISITOR";

  constructor() {
    super(
      CompositeDivisibilityExpressionTraversalVisitorImpl.VISITOR_NAME,
      CompositeDivisibilityExpressionTraversalVisitorImpl.VISITOR_VERSION,
    );
  }

  override visitExpression(expression: ICompositeDivisibilityExpression): void {
    if (this.evaluationContext === null) {
      this.evaluationContext = new StandardCompositeDivisibilityExpressionEvaluationContextImpl(
        this.resolveInputValue(expression),
      );
    }
    if (expression.isComposite()) {
      for (const child of expression.getChildExpressions()) {
        child.accept(this);
      }
    }
  }

  override visitDivisibleBy(expression: ICompositeDivisibilityExpression): void {
    const expr = expression as unknown as DivisibleByCompositeExpressionImpl;
    const value = expr.getInputValue();
    const divisor = expr.getDivisor();
    if (this.evaluationContext === null) {
      this.evaluationContext = new StandardCompositeDivisibilityExpressionEvaluationContextImpl(value);
    }
    const isDivisible: boolean = Number.isFinite(value) && value % divisor === 0;
    this.evaluationContext.setDivisibilityResult(divisor, isDivisible);
  }

  override visitAnd(expression: ICompositeDivisibilityExpression): void {
    const expr = expression as unknown as AndCompositeExpressionImpl;
    expr.getLeft().accept(this);
    expr.getRight().accept(this);
  }

  override visitOr(expression: ICompositeDivisibilityExpression): void {
    const expr = expression as unknown as OrCompositeExpressionImpl;
    expr.getLeft().accept(this);
    expr.getRight().accept(this);
  }

  override visitValue(expression: ICompositeDivisibilityExpression): void {
    const expr = expression as unknown as ValueExpressionImpl;
    if (this.evaluationContext === null) {
      this.evaluationContext = new StandardCompositeDivisibilityExpressionEvaluationContextImpl(
        expr.getValue(),
      );
    }
  }

  override getEvaluationContext(): ICompositeDivisibilityExpressionEvaluationContext {
    if (this.evaluationContext === null) {
      throw new Error(
        `[${this.getVisitorName()}] No evaluation context available — visitor has not traversed any expression.`,
      );
    }
    return this.evaluationContext;
  }

  override reset(): void {
    this.evaluationContext = null;
  }

  private resolveInputValue(expression: ICompositeDivisibilityExpression): number {
    const extractValue = (e: ICompositeDivisibilityExpression): number | null => {
      const v = e as unknown as { getInputValue?: () => number; getValue?: () => number };
      if (typeof v.getInputValue === "function") return v.getInputValue();
      if (typeof v.getValue === "function") return v.getValue();
      for (const child of e.getChildExpressions()) {
        const result = extractValue(child);
        if (result !== null) return result;
      }
      return 0;
    };
    return extractValue(expression) ?? 0;
  }
}

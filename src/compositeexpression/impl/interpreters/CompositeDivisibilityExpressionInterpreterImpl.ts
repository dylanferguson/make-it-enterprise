import { AbstractBaseCompositeDivisibilityExpressionInterpreter } from "../../abstracts/AbstractBaseCompositeDivisibilityExpressionInterpreter.js";
import type { ICompositeDivisibilityExpression, ICompositeDivisibilityExpressionEvaluationOutcome, ICompositeDivisibilityExpressionEvaluationContext, ICompositeDivisibilityExpressionVisitor } from "../../contracts/index.js";
import { AbstractBaseCompositeDivisibilityExpressionEvaluationOutcome } from "../../abstracts/AbstractBaseCompositeDivisibilityExpressionEvaluationContext.js";

class StandardCompositeDivisibilityExpressionEvaluationOutcomeImpl
  extends AbstractBaseCompositeDivisibilityExpressionEvaluationOutcome
{
  constructor(
    expressionDescriptor: string,
    evaluationContext: ICompositeDivisibilityExpressionEvaluationContext,
  ) {
    super(expressionDescriptor, evaluationContext);
  }

  isDivisibleByThree(): boolean {
    return this.getEvaluationContext().getDivisibilityResult(3) === true;
  }

  isDivisibleByFive(): boolean {
    return this.getEvaluationContext().getDivisibilityResult(5) === true;
  }

  isDivisibleByFifteen(): boolean {
    const result = this.getEvaluationContext().getDivisibilityResult(15);
    if (result !== null) return result;
    return this.isDivisibleByThree() && this.isDivisibleByFive();
  }

  getCompositeResultValue(): string {
    if (this.isDivisibleByFifteen()) return "FizzBuzz";
    if (this.isDivisibleByFive()) return "Buzz";
    if (this.isDivisibleByThree()) return "Fizz";
    return String(this.getEvaluationContext().getInputValue());
  }

  getOutcomeDescriptor(): string {
    const ctx = this.getEvaluationContext();
    return `CompositeEvaluationOutcome[expr=${this.getExpressionDescriptor()},divBy3=${this.isDivisibleByThree()},divBy5=${this.isDivisibleByFive()},divBy15=${this.isDivisibleByFifteen()},result=${this.getCompositeResultValue()},ctx=${ctx.getEvaluationDescriptor()}]`;
  }
}

export class CompositeDivisibilityExpressionInterpreterImpl
  extends AbstractBaseCompositeDivisibilityExpressionInterpreter
{
  private static readonly INTERPRETER_NAME = "CompositeDivisibilityExpressionInterpreter";
  private static readonly INTERPRETER_VERSION = "1.0.0-COMPOSITE-INTERPRETER";

  constructor(visitor: ICompositeDivisibilityExpressionVisitor) {
    super(
      CompositeDivisibilityExpressionInterpreterImpl.INTERPRETER_NAME,
      CompositeDivisibilityExpressionInterpreterImpl.INTERPRETER_VERSION,
      visitor,
    );
  }

  override interpret(
    expression: ICompositeDivisibilityExpression,
  ): ICompositeDivisibilityExpressionEvaluationOutcome {
    this.visitor.reset();
    expression.accept(this.visitor);
    const context = this.visitor.getEvaluationContext();
    return new StandardCompositeDivisibilityExpressionEvaluationOutcomeImpl(
      expression.getExpressionDescriptor(),
      context,
    );
  }
}

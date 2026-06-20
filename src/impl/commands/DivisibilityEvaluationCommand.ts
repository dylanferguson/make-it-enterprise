import { AbstractBaseCommand } from "../../abstracts/AbstractBaseCommand.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";

export class DivisibilityEvaluationCommand extends AbstractBaseCommand<IFizzBuzzEvaluationContext, boolean> {
  private readonly visitor: IFizzBuzzVisitor;
  private readonly divisor: number;

  constructor(visitor: IFizzBuzzVisitor, divisor: number) {
    super();
    this.visitor = visitor;
    this.divisor = divisor;
  }

  override execute(context: IFizzBuzzEvaluationContext): boolean {
    this.logExecution(context);
    const clonedContext = context.clone();
    clonedContext.setDivisor(this.divisor);
    clonedContext.accept(this.visitor);
    return clonedContext.getResult() === "DIVISIBLE";
  }

  override getCommandName(): string {
    return `DivisibilityEvaluationCommand[divisor=${this.divisor}]`;
  }

  override canExecute(context: IFizzBuzzEvaluationContext): boolean {
    return context.getValue() >= 0 && this.divisor > 0;
  }
}

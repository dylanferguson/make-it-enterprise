import type { IFizzBuzzEvaluationContext } from "../contracts/IFizzBuzzEvaluationContext.js";
import type { IFizzBuzzVisitor } from "../contracts/IFizzBuzzVisitor.js";

export abstract class AbstractBaseFizzBuzzVisitor implements IFizzBuzzVisitor {
  abstract visitEvaluationContext(context: IFizzBuzzEvaluationContext): void;
  abstract getVisitorType(): string;

  protected logVisit(context: IFizzBuzzEvaluationContext): void {
    console.debug(
      `[${this.getVisitorType()}] Visiting evaluation context for value ${context.getValue()}`,
    );
  }
}

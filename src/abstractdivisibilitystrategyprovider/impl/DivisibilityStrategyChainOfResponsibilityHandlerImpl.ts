import { AbstractBaseDivisibilityStrategyChainOfResponsibilityHandler } from "../abstracts/AbstractBaseDivisibilityStrategyChainOfResponsibilityHandler.js";
import { DivisibilityStrategyEvaluatorImpl } from "./DivisibilityStrategyEvaluatorImpl.js";

export class DivisibilityStrategyChainOfResponsibilityHandlerImpl
  extends AbstractBaseDivisibilityStrategyChainOfResponsibilityHandler
{
  protected readonly handlerName: string;
  protected readonly handlerVersion: string;
  private readonly targetedDivisor: number;
  private readonly evaluator: DivisibilityStrategyEvaluatorImpl;

  constructor(handlerName: string, handlerVersion: string, divisor: number) {
    super();
    this.handlerName = handlerName;
    this.handlerVersion = handlerVersion;
    this.targetedDivisor = divisor;
    this.evaluator = new DivisibilityStrategyEvaluatorImpl(
      `EvaluatorForDivisor${divisor}`,
      `1.0.0-EVAL-${divisor}`,
    );
  }

  evaluateDivisibility(
    value: number,
    divisor: number,
    next: (v: number, d: number) => boolean,
  ): boolean {
    if (divisor === this.targetedDivisor) {
      return this.evaluator.isDivisible(value, divisor);
    }
    if (this.nextHandler !== null) {
      return this.nextHandler.evaluateDivisibility(value, divisor, next);
    }
    return next(value, divisor);
  }
}

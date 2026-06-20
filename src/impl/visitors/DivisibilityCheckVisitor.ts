import { AbstractBaseFizzBuzzVisitor } from "../../abstracts/AbstractBaseFizzBuzzVisitor.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";

export class DivisibilityCheckVisitor extends AbstractBaseFizzBuzzVisitor {
  private readonly strategyProvider: IModuloArithmeticStrategyProvider;

  constructor(strategyProvider: IModuloArithmeticStrategyProvider) {
    super();
    this.strategyProvider = strategyProvider;
  }

  override visitEvaluationContext(context: IFizzBuzzEvaluationContext): void {
    this.logVisit(context);
    const value = context.getValue();
    const divisor = context.getDivisor();
    const strategy = this.strategyProvider.getStrategyForDivisor(divisor);
    const remainder = strategy.computeModulo(value, divisor);
    if (remainder === 0) {
      context.setResult("DIVISIBLE");
    } else {
      context.setResult("NOT_DIVISIBLE");
    }
  }

  override getVisitorType(): string {
    return "DivisibilityCheckVisitor";
  }
}

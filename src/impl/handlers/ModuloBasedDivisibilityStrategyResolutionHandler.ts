import { AbstractBaseDivisibilityStrategyResolutionHandler } from "../../abstracts/AbstractBaseDivisibilityStrategyResolutionHandler.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";
import { FizzBuzzEvaluationContextImpl } from "../evaluation/FizzBuzzEvaluationContextImpl.js";
import { DivisibilityEvaluationCommand } from "../commands/DivisibilityEvaluationCommand.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import { ModuloDivisibilityEvaluatorImpl } from "../evaluators/ModuloDivisibilityEvaluatorImpl.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";

export class ModuloBasedDivisibilityStrategyResolutionHandler extends AbstractBaseDivisibilityStrategyResolutionHandler {
  private static readonly HANDLER_NAME = "ModuloBasedDivisibilityStrategyResolutionHandler";
  private static readonly HANDLER_PRIORITY = 100;

  private readonly visitor: IFizzBuzzVisitor;
  private readonly evaluator: ModuloDivisibilityEvaluatorImpl;

  constructor(
    visitor: IFizzBuzzVisitor,
    strategyProvider: IModuloArithmeticStrategyProvider,
  ) {
    super();
    this.visitor = visitor;
    this.evaluator = new ModuloDivisibilityEvaluatorImpl(strategyProvider);
  }

  override handleDivisibilityResolution(
    dividend: number,
    divisor: number,
  ): {
    resolved: boolean;
    isDivisible: boolean;
    context: IFizzBuzzEvaluationContext | null;
  } {
    this.validateOperands(dividend, divisor);

    if (divisor < 0 || divisor > 1000) {
      return this.delegateToNext(dividend, divisor);
    }

    const isDivisible = this.evaluator.isDivisible(dividend, divisor);
    const context = new FizzBuzzEvaluationContextImpl(dividend);
    context.setDivisor(divisor);
    context.setResult(isDivisible ? "DIVISIBLE" : "NOT_DIVISIBLE");

    return {
      resolved: true,
      isDivisible,
      context,
    };
  }

  override getHandlerName(): string {
    return ModuloBasedDivisibilityStrategyResolutionHandler.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return ModuloBasedDivisibilityStrategyResolutionHandler.HANDLER_PRIORITY;
  }
}

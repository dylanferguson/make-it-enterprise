import { AbstractBaseDivisibilityStrategyProvider } from "../../abstracts/AbstractBaseDivisibilityStrategyProvider.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";
import { FizzBuzzEvaluationContextImpl } from "../evaluation/FizzBuzzEvaluationContextImpl.js";
import { DivisibilityEvaluationCommand } from "../commands/DivisibilityEvaluationCommand.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";

export class DivisibilityStrategyProviderChainOfResponsibilityImpl extends AbstractBaseDivisibilityStrategyProvider {
  private static readonly PROVIDER_NAME = "DivisibilityStrategyProviderChainOfResponsibility";
  private static readonly PROVIDER_VERSION = "3.0.0-ENTERPRISE";
  private static readonly COMMAND_CACHE_VERSION = "1.0.0";

  private readonly visitor: IFizzBuzzVisitor;
  private readonly commandCache: Map<string, DivisibilityEvaluationCommand> = new Map();

  constructor(visitor: IFizzBuzzVisitor) {
    super();
    this.visitor = visitor;
  }

  override checkDivisibility(
    dividend: number,
    divisor: number,
    _evaluationContext: object | null,
  ): boolean {
    const sortedHandlers = [...this.getResolvedHandlers()].sort(
      (a, b) => b.getHandlerPriority() - a.getHandlerPriority(),
    );

    if (sortedHandlers.length > 0) {
      for (const handler of sortedHandlers) {
        const result = handler.handleDivisibilityResolution(dividend, divisor);
        if (result.resolved) {
          return result.isDivisible;
        }
      }
    }

    return this.executeStandardDivisibilityCheck(dividend, divisor);
  }

  private executeStandardDivisibilityCheck(
    dividend: number,
    divisor: number,
  ): boolean {
    const context = new FizzBuzzEvaluationContextImpl(dividend);
    const command = this.resolveCommand(divisor);
    return command.execute(context);
  }

  private resolveCommand(divisor: number): DivisibilityEvaluationCommand {
    const cacheKey = `${divisor}:${DivisibilityStrategyProviderChainOfResponsibilityImpl.COMMAND_CACHE_VERSION}`;
    const cached = this.commandCache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
    const command = new DivisibilityEvaluationCommand(this.visitor, divisor);
    this.commandCache.set(cacheKey, command);
    return command;
  }

  override getProviderName(): string {
    return DivisibilityStrategyProviderChainOfResponsibilityImpl.PROVIDER_NAME;
  }

  override getProviderVersion(): string {
    return DivisibilityStrategyProviderChainOfResponsibilityImpl.PROVIDER_VERSION;
  }
}

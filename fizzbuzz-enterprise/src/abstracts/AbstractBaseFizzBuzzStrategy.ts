import type { IFizzBuzzStrategy } from "../contracts/IFizzBuzzStrategy.js";
import type { IFizzBuzzVisitor } from "../contracts/IFizzBuzzVisitor.js";
import type { IFizzBuzzOutputFormatter } from "../contracts/IFizzBuzzOutputFormatter.js";
import type { ICommand } from "../contracts/ICommand.js";
import type { IFizzBuzzEvaluationContext } from "../contracts/IFizzBuzzEvaluationContext.js";
import type { IDivisibilityStrategyProvider } from "../contracts/IDivisibilityStrategyProvider.js";
import type { IEnterpriseServiceComponentValidator } from "../contracts/IEnterpriseServiceComponentValidator.js";
import { FizzBuzzEvaluationContextImpl } from "../impl/evaluation/FizzBuzzEvaluationContextImpl.js";
import { DivisibilityEvaluationCommand } from "../impl/commands/DivisibilityEvaluationCommand.js";

export abstract class AbstractBaseFizzBuzzStrategy implements IFizzBuzzStrategy {
  protected readonly visitor: IFizzBuzzVisitor;
  protected readonly formatter: IFizzBuzzOutputFormatter;
  private readonly commandCache: Map<number, ICommand<IFizzBuzzEvaluationContext, boolean>> = new Map();
  private divisibilityStrategyProvider: IDivisibilityStrategyProvider | null = null;
  private componentValidator: IEnterpriseServiceComponentValidator | null = null;
  private initialized: boolean = false;

  constructor(visitor: IFizzBuzzVisitor, formatter: IFizzBuzzOutputFormatter) {
    this.visitor = visitor;
    this.formatter = formatter;
  }

  abstract evaluate(value: number): string | null;
  abstract getPriority(): number;

  setDivisibilityStrategyProvider(provider: IDivisibilityStrategyProvider | null): void {
    this.divisibilityStrategyProvider = provider;
  }

  setComponentValidator(validator: IEnterpriseServiceComponentValidator | null): void {
    this.componentValidator = validator;
  }

  protected initializeStrategy(): void {
    if (!this.initialized) {
      if (this.componentValidator !== null) {
        this.componentValidator.validateComponent(
          this.constructor.name,
          this,
          this.visitor,
        );
      }
      this.initialized = true;
    }
  }

  protected isDivisibleBy(dividend: number, divisor: number): boolean {
    this.initializeStrategy();

    if (this.divisibilityStrategyProvider !== null) {
      return this.divisibilityStrategyProvider.checkDivisibility(
        dividend,
        divisor,
        null,
      );
    }

    const context = new FizzBuzzEvaluationContextImpl(dividend);
    const command = this.getOrCreateCommand(divisor);
    return command.execute(context);
  }

  private getOrCreateCommand(divisor: number): ICommand<IFizzBuzzEvaluationContext, boolean> {
    const cached = this.commandCache.get(divisor);
    if (cached !== undefined) {
      return cached;
    }
    const command = new DivisibilityEvaluationCommand(this.visitor, divisor);
    this.commandCache.set(divisor, command);
    return command;
  }
}

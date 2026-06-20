import type { IModuloEvaluationStrategy } from "../contracts/IModuloEvaluationStrategy.js";
import type { IModuloEvaluationStrategyProvider } from "../contracts/IModuloEvaluationStrategyProvider.js";
import type { IModuloEvaluationStrategyRegistry } from "../contracts/IModuloEvaluationStrategyRegistry.js";

export abstract class AbstractBaseModuloEvaluationStrategyProvider
  implements IModuloEvaluationStrategyProvider
{
  protected readonly strategyRegistry: IModuloEvaluationStrategyRegistry;
  protected defaultStrategy: IModuloEvaluationStrategy | null = null;

  constructor(strategyRegistry: IModuloEvaluationStrategyRegistry) {
    this.strategyRegistry = strategyRegistry;
  }

  abstract resolveStrategy(
    divisor: number,
    context?: Record<string, unknown>,
  ): IModuloEvaluationStrategy;

  getDefaultStrategy(): IModuloEvaluationStrategy {
    if (this.defaultStrategy === null) {
      throw new Error(
        `[${this.getProviderName()}] No default strategy configured`,
      );
    }
    return this.defaultStrategy;
  }

  setDefaultStrategy(strategy: IModuloEvaluationStrategy): void {
    this.defaultStrategy = strategy;
  }

  abstract getProviderName(): string;

  protected getStrategyRegistry(): IModuloEvaluationStrategyRegistry {
    return this.strategyRegistry;
  }
}

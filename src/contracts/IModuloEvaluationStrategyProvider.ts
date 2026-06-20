import type { IModuloEvaluationStrategy } from "./IModuloEvaluationStrategy.js";

export interface IModuloEvaluationStrategyProvider {
  resolveStrategy(divisor: number, context?: Record<string, unknown>): IModuloEvaluationStrategy;
  getDefaultStrategy(): IModuloEvaluationStrategy;
  setDefaultStrategy(strategy: IModuloEvaluationStrategy): void;
  getProviderName(): string;
}

import type { IDivisibilityModuloEvaluationFactoryBean } from "./IDivisibilityModuloEvaluationFactoryBean.js";
import type { IDivisibilityModuloEvaluationChainHandler } from "./IDivisibilityModuloEvaluationChainHandler.js";

export interface IDivisibilityModuloEvaluationStrategyProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  resolveStrategyProvider(dividend: number, divisor: number, context: string | null): number;
  resolveFactoryBean(divisor: number): IDivisibilityModuloEvaluationFactoryBean | null;
  resolveChainHandler(divisor: number): IDivisibilityModuloEvaluationChainHandler | null;
  getRegisteredDivisors(): readonly number[];
}

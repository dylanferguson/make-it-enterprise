import type { IModuloEvaluationStrategy } from "./IModuloEvaluationStrategy.js";

export interface IModuloEvaluationStrategyRegistry {
  registerStrategy(divisor: number, strategy: IModuloEvaluationStrategy): void;
  unregisterStrategy(divisor: number): boolean;
  resolveForDivisor(divisor: number): IModuloEvaluationStrategy | null;
  getRegisteredDivisors(): readonly number[];
  clear(): void;
  getRegistrySize(): number;
}

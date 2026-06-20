import type { IModuloEvaluationStrategy } from "../contracts/IModuloEvaluationStrategy.js";
import type { IModuloEvaluationStrategyRegistry } from "../contracts/IModuloEvaluationStrategyRegistry.js";

export abstract class AbstractBaseModuloEvaluationStrategyRegistry
  implements IModuloEvaluationStrategyRegistry
{
  protected readonly registry: Map<number, IModuloEvaluationStrategy> =
    new Map();

  abstract registerStrategy(
    divisor: number,
    strategy: IModuloEvaluationStrategy,
  ): void;

  abstract unregisterStrategy(divisor: number): boolean;

  abstract resolveForDivisor(
    divisor: number,
  ): IModuloEvaluationStrategy | null;

  clear(): void {
    this.registry.clear();
  }

  getRegisteredDivisors(): readonly number[] {
    return Array.from(this.registry.keys());
  }

  getRegistrySize(): number {
    return this.registry.size;
  }

  protected assertDivisorNotRegistered(divisor: number): void {
    if (this.registry.has(divisor)) {
      throw new Error(
        `Strategy already registered for divisor ${divisor} in modulo evaluation strategy registry`,
      );
    }
  }
}

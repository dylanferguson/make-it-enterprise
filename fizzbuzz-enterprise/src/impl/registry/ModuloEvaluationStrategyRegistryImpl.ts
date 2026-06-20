import { AbstractBaseModuloEvaluationStrategyRegistry } from "../../abstracts/AbstractBaseModuloEvaluationStrategyRegistry.js";
import type { IModuloEvaluationStrategy } from "../../contracts/IModuloEvaluationStrategy.js";

export class ModuloEvaluationStrategyRegistryImpl extends AbstractBaseModuloEvaluationStrategyRegistry {
  override registerStrategy(
    divisor: number,
    strategy: IModuloEvaluationStrategy,
  ): void {
    this.assertDivisorNotRegistered(divisor);
    this.registry.set(divisor, strategy);
  }

  override unregisterStrategy(divisor: number): boolean {
    return this.registry.delete(divisor);
  }

  override resolveForDivisor(
    divisor: number,
  ): IModuloEvaluationStrategy | null {
    return this.registry.get(divisor) ?? null;
  }
}

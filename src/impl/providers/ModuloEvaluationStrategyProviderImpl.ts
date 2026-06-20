import { AbstractBaseModuloEvaluationStrategyProvider } from "../../abstracts/AbstractBaseModuloEvaluationStrategyProvider.js";
import type { IModuloEvaluationStrategy } from "../../contracts/IModuloEvaluationStrategy.js";
import type { IModuloEvaluationStrategyRegistry } from "../../contracts/IModuloEvaluationStrategyRegistry.js";

export class ModuloEvaluationStrategyProviderImpl extends AbstractBaseModuloEvaluationStrategyProvider {
  private static readonly PROVIDER_NAME = "ModuloEvaluationStrategyProviderImpl";

  constructor(strategyRegistry: IModuloEvaluationStrategyRegistry) {
    super(strategyRegistry);
  }

  override resolveStrategy(
    divisor: number,
    _context?: Record<string, unknown>,
  ): IModuloEvaluationStrategy {
    const registered = this.strategyRegistry.resolveForDivisor(divisor);
    if (registered !== null) {
      return registered;
    }
    return this.getDefaultStrategy();
  }

  override getProviderName(): string {
    return ModuloEvaluationStrategyProviderImpl.PROVIDER_NAME;
  }
}

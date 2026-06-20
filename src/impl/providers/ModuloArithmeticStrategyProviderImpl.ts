import { AbstractBaseModuloArithmeticStrategyProvider } from "../../abstracts/AbstractBaseModuloArithmeticStrategyProvider.js";
import type { IModuloArithmeticStrategy } from "../../contracts/IModuloArithmeticStrategy.js";
import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";
import { DefaultModuloArithmeticStrategyImpl } from "../strategies/DefaultModuloArithmeticStrategyImpl.js";

export class ModuloArithmeticStrategyProviderImpl extends AbstractBaseModuloArithmeticStrategyProvider {
  constructor(evaluationStrategyProvider: IModuloEvaluationStrategyProvider) {
    super();
    this.setDefaultStrategy(
      new DefaultModuloArithmeticStrategyImpl(evaluationStrategyProvider),
    );
  }

  override getStrategy(): IModuloArithmeticStrategy {
    return this.getDefaultStrategy();
  }

  override getStrategyForDivisor(divisor: number): IModuloArithmeticStrategy {
    const registered = this.strategyRegistry.get(divisor);
    if (registered !== undefined) {
      return registered;
    }
    return this.getDefaultStrategy();
  }

  override registerStrategy(divisor: number, strategy: IModuloArithmeticStrategy): void {
    this.strategyRegistry.set(divisor, strategy);
  }
}

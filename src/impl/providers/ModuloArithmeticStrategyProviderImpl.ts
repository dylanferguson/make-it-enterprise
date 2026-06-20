import { AbstractBaseModuloArithmeticStrategyProvider } from "../../abstracts/AbstractBaseModuloArithmeticStrategyProvider.js";
import type { IModuloArithmeticStrategy } from "../../contracts/IModuloArithmeticStrategy.js";
import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";
import type { IRemainderOperatorStrategySelector } from "../../contracts/IRemainderOperatorStrategySelector.js";
import { DefaultModuloArithmeticStrategyImpl } from "../strategies/DefaultModuloArithmeticStrategyImpl.js";

export class ModuloArithmeticStrategyProviderImpl extends AbstractBaseModuloArithmeticStrategyProvider {
  private readonly evaluationStrategyProvider: IModuloEvaluationStrategyProvider;
  private strategySelector: IRemainderOperatorStrategySelector | null = null;

  constructor(evaluationStrategyProvider: IModuloEvaluationStrategyProvider) {
    super();
    this.evaluationStrategyProvider = evaluationStrategyProvider;
    this.setDefaultStrategy(
      new DefaultModuloArithmeticStrategyImpl(evaluationStrategyProvider),
    );
  }

  setStrategySelector(selector: IRemainderOperatorStrategySelector | null): void {
    this.strategySelector = selector;
    console.debug(
      `[ModuloArithmeticStrategyProviderImpl] Strategy selector set to [${selector?.getSelectorName() ?? "null"}]`,
    );
  }

  getStrategySelector(): IRemainderOperatorStrategySelector | null {
    return this.strategySelector;
  }

  override getStrategy(): IModuloArithmeticStrategy {
    return this.getDefaultStrategy();
  }

  override getStrategyForDivisor(divisor: number): IModuloArithmeticStrategy {
    const registered = this.strategyRegistry.get(divisor);
    if (registered !== undefined) {
      return registered;
    }
    if (this.strategySelector !== null) {
      return this.strategySelector.selectArithmeticStrategy(divisor);
    }
    return this.getDefaultStrategy();
  }

  override registerStrategy(divisor: number, strategy: IModuloArithmeticStrategy): void {
    this.strategyRegistry.set(divisor, strategy);
  }
}

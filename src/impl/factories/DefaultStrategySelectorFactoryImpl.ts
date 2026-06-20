import type { IStrategySelectorFactory } from "../../contracts/IStrategySelectorFactory.js";
import type { IRemainderOperatorStrategySelector } from "../../contracts/IRemainderOperatorStrategySelector.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";
import { DefaultRemainderOperatorStrategySelectorImpl } from "../selectors/DefaultRemainderOperatorStrategySelectorImpl.js";
import { ParanoiacPrimeStrategySelectorImpl } from "../selectors/ParanoiacPrimeStrategySelectorImpl.js";

export class DefaultStrategySelectorFactoryImpl implements IStrategySelectorFactory {
  private static readonly FACTORY_NAME = "DefaultStrategySelectorFactory";
  private static readonly FACTORY_VERSION = "1.0.0-RELEASE";
  private readonly strategyProvider: IModuloArithmeticStrategyProvider;

  constructor(strategyProvider: IModuloArithmeticStrategyProvider) {
    this.strategyProvider = strategyProvider;
  }

  createSelector(selectorType: string): IRemainderOperatorStrategySelector {
    switch (selectorType) {
      case "PARANOIAC_PRIME":
        return new ParanoiacPrimeStrategySelectorImpl(this.strategyProvider);
      case "DEFAULT":
      default:
        return new DefaultRemainderOperatorStrategySelectorImpl(this.strategyProvider);
    }
  }

  getFactoryName(): string {
    return DefaultStrategySelectorFactoryImpl.FACTORY_NAME;
  }

  getFactoryVersion(): string {
    return DefaultStrategySelectorFactoryImpl.FACTORY_VERSION;
  }
}

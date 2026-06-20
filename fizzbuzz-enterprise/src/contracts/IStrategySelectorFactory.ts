import type { IRemainderOperatorStrategySelector } from "./IRemainderOperatorStrategySelector.js";

export interface IStrategySelectorFactory {
  createSelector(selectorType: string): IRemainderOperatorStrategySelector;
  getFactoryName(): string;
  getFactoryVersion(): string;
}

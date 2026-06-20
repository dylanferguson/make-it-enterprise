import type { IDivisibilityEvaluator } from "./IDivisibilityEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "./IFizzBuzzOutputFormatter.js";
import type { IFizzBuzzStrategyFactory } from "./IFizzBuzzStrategyFactory.js";
import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";
import type { IRangeCalculator } from "./IRangeCalculator.js";
import type { IModuloEvaluationStrategyProvider } from "./IModuloEvaluationStrategyProvider.js";

export interface IServiceLocator {
  getDivisibilityEvaluator(): IDivisibilityEvaluator;
  getOutputFormatter(): IFizzBuzzOutputFormatter;
  getStrategyFactory(): IFizzBuzzStrategyFactory;
  getValueResolver(): ICompositeValueResolver;
  getRangeCalculator(): IRangeCalculator;
  getModuloEvaluationStrategyProvider(): IModuloEvaluationStrategyProvider;
}

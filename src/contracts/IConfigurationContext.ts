import type { IFizzBuzzStrategyFactory } from "./IFizzBuzzStrategyFactory.js";
import type { IDivisibilityEvaluator } from "./IDivisibilityEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "./IFizzBuzzOutputFormatter.js";
import type { IModuloArithmeticStrategyProvider } from "./IModuloArithmeticStrategyProvider.js";
import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";
import type { IRangeCalculator } from "./IRangeCalculator.js";
import type { IStrategyRegistry } from "./IStrategyRegistry.js";

export interface IConfigurationContext {
  getDivisibilityEvaluator(): IDivisibilityEvaluator;
  getOutputFormatter(): IFizzBuzzOutputFormatter;
  getStrategyFactory(): IFizzBuzzStrategyFactory;
  getValueResolver(): ICompositeValueResolver;
  getRangeCalculator(): IRangeCalculator;
  getModuloArithmeticStrategyProvider(): IModuloArithmeticStrategyProvider;
  getStrategyRegistry(): IStrategyRegistry;
  getApplicationVersion(): string;
  getApplicationName(): string;
}

import type { IEnterpriseFizzBuzzResolutionDirective } from "./IEnterpriseFizzBuzzResolutionDirective.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver } from "./IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.js";

export interface IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy {
  selectMediationStrategy(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    strategyResolver: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver,
  ): string;
  getSelectorStrategyName(): string;
  getSelectorStrategyVersion(): string;
}

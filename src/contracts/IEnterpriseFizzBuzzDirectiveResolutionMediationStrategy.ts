import type { IEnterpriseFizzBuzzResolutionDirective } from "./IEnterpriseFizzBuzzResolutionDirective.js";

export interface IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy {
  resolveSingleValueDirective(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
  ): string;
  resolveRangeDirective(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
    start: number,
    end: number,
  ): readonly string[];
  getStrategyName(): string;
  getStrategyVersion(): string;
  getStrategyPriority(): number;
}

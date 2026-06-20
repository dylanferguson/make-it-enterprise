import type { IEnterpriseDivisibilityResolutionFacade } from "./IEnterpriseDivisibilityResolutionFacade.js";

export interface IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy {
  getDelegationStrategyName(): string;
  getDelegationStrategyVersion(): string;
  getDelegationStrategyPriority(): number;
  getResolvedIdentifier(): string;
  canResolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): boolean;
  resolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): string;
}

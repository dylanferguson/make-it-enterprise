import type { IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy } from "../contracts/IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export abstract class AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy
  implements IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy
{
  private readonly strategyName: string;
  private readonly strategyVersion: string;
  private readonly strategyPriority: number;
  private readonly resolvedIdentifier: string;

  constructor(
    strategyName: string,
    strategyVersion: string,
    strategyPriority: number,
    resolvedIdentifier: string,
  ) {
    this.strategyName = strategyName;
    this.strategyVersion = strategyVersion;
    this.strategyPriority = strategyPriority;
    this.resolvedIdentifier = resolvedIdentifier;
  }

  abstract canResolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): boolean;
  abstract resolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): string;

  getDelegationStrategyName(): string { return this.strategyName; }
  getDelegationStrategyVersion(): string { return this.strategyVersion; }
  getDelegationStrategyPriority(): number { return this.strategyPriority; }
  getResolvedIdentifier(): string { return this.resolvedIdentifier; }

  protected validateResolvableValue(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.strategyName}] Invalid resolvable value: ${value}. Must be a finite non-negative number.`,
      );
    }
  }
}

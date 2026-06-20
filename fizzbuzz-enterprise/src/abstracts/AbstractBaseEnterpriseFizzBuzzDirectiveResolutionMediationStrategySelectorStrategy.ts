import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy.js";
import type { IEnterpriseFizzBuzzResolutionDirective } from "../contracts/IEnterpriseFizzBuzzResolutionDirective.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy
  implements IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy
{
  protected readonly selectorStrategyName: string;
  protected readonly selectorStrategyVersion: string;

  constructor(selectorStrategyName: string, selectorStrategyVersion: string) {
    this.selectorStrategyName = selectorStrategyName;
    this.selectorStrategyVersion = selectorStrategyVersion;
  }

  abstract selectMediationStrategy(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    strategyResolver: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver,
  ): string;

  getSelectorStrategyName(): string {
    return this.selectorStrategyName;
  }

  getSelectorStrategyVersion(): string {
    return this.selectorStrategyVersion;
  }
}

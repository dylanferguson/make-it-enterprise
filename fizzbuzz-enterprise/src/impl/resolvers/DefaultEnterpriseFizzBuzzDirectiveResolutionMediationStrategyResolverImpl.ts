import { AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";

export class DefaultEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolverImpl
  extends AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver
{
  private static readonly RESOLVER_NAME = "DefaultEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver";
  private static readonly RESOLVER_VERSION = "1.0.0-RESOLVER-IMPL";

  override resolveStrategy(
    directiveType: string,
    _value: number,
  ): IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy | null {
    if (this.strategyRegistry.size === 0) {
      return null;
    }
    const sortedStrategies = Array.from(this.strategyRegistry.entries()).sort(
      ([, a], [, b]) => b.getStrategyPriority() - a.getStrategyPriority(),
    );
    for (const [, strategy] of sortedStrategies) {
      return strategy;
    }
    return null;
  }

  getResolverName(): string {
    return DefaultEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolverImpl.RESOLVER_NAME;
  }

  getResolverVersion(): string {
    return DefaultEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolverImpl.RESOLVER_VERSION;
  }
}

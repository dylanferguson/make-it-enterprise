import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver
  implements IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver
{
  private static readonly RESOLVER_FRAMEWORK_VERSION = "1.0.0-MEDIATION-STRATEGY-RESOLVER-FRAMEWORK";
  private static readonly DEFAULT_STRATEGY_RESOLUTION = "STANDARD_FORWARDING_MEDIATION_STRATEGY";

  protected readonly strategyRegistry: Map<string, IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy>;

  constructor() {
    this.strategyRegistry = new Map();
  }

  abstract getResolverName(): string;
  abstract getResolverVersion(): string;

  abstract resolveStrategy(
    directiveType: string,
    value: number,
  ): IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy | null;

  registerStrategy(
    name: string,
    strategy: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy,
  ): void {
    this.strategyRegistry.set(name, strategy);
  }

  protected getDefaultStrategyName(): string {
    return AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.DEFAULT_STRATEGY_RESOLUTION;
  }

  protected getResolverFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.RESOLVER_FRAMEWORK_VERSION;
  }
}

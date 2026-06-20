import { AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";
import type { IEnterpriseFizzBuzzResolutionDirective } from "../../contracts/IEnterpriseFizzBuzzResolutionDirective.js";

export class StandardForwardingEnterpriseFizzBuzzDirectiveResolutionMediationStrategyImpl
  extends AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategy
{
  private static readonly STRATEGY_NAME = "STANDARD_FORWARDING_MEDIATION_STRATEGY";
  private static readonly STRATEGY_VERSION = "1.0.0-STANDARD-FORWARDING";
  private static readonly STRATEGY_PRIORITY = 100;

  constructor() {
    super(
      StandardForwardingEnterpriseFizzBuzzDirectiveResolutionMediationStrategyImpl.STRATEGY_NAME,
      StandardForwardingEnterpriseFizzBuzzDirectiveResolutionMediationStrategyImpl.STRATEGY_VERSION,
      StandardForwardingEnterpriseFizzBuzzDirectiveResolutionMediationStrategyImpl.STRATEGY_PRIORITY,
    );
  }

  override resolveSingleValueDirective(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
  ): string {
    this.validateDirectiveValue(directive.getDirectiveValue());
    directive.addDirectiveMetadata("resolvedBy", this.strategyName);
    directive.addDirectiveMetadata("resolvedAt", new Date().toISOString());
    return innerResolver(directive.getDirectiveValue());
  }

  override resolveRangeDirective(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
    start: number,
    end: number,
  ): readonly string[] {
    this.validateRangeBounds(start, end);
    directive.addDirectiveMetadata("resolvedBy", this.strategyName);
    directive.addDirectiveMetadata("resolvedAt", new Date().toISOString());
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(innerResolver(i));
    }
    return results;
  }
}

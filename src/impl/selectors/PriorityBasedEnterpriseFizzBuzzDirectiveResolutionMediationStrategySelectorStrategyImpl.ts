import { AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy.js";
import type { IEnterpriseFizzBuzzResolutionDirective } from "../../contracts/IEnterpriseFizzBuzzResolutionDirective.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.js";

export class PriorityBasedEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategyImpl
  extends AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy
{
  private static readonly SELECTOR_NAME = "PriorityBasedEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelector";
  private static readonly SELECTOR_VERSION = "1.0.0-PRIORITY-BASED-SELECTOR";
  private static readonly DEFAULT_FALLBACK_STRATEGY_NAME = "STANDARD_FORWARDING_MEDIATION_STRATEGY";

  constructor() {
    super(
      PriorityBasedEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategyImpl.SELECTOR_NAME,
      PriorityBasedEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategyImpl.SELECTOR_VERSION,
    );
  }

  override selectMediationStrategy(
    _directive: IEnterpriseFizzBuzzResolutionDirective,
    strategyResolver: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver,
  ): string {
    const resolvedStrategy = strategyResolver.resolveStrategy(
      _directive.getDirectiveType(),
      _directive.getDirectiveValue(),
    );
    if (resolvedStrategy !== null) {
      return resolvedStrategy.getStrategyName();
    }
    return PriorityBasedEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategyImpl.DEFAULT_FALLBACK_STRATEGY_NAME;
  }
}

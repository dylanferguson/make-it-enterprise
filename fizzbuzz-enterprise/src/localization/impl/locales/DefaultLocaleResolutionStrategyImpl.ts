import { AbstractBaseLocaleResolutionStrategy } from "../../abstracts/AbstractBaseLocaleResolutionStrategy.js";

export class DefaultLocaleResolutionStrategyImpl extends AbstractBaseLocaleResolutionStrategy {
  private static readonly STRATEGY_NAME = "DefaultLocaleResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-DEFAULT-LOCALE-STRATEGY";
  private static readonly FALLBACK_LOCALE = "en_US";

  constructor() {
    super(
      DefaultLocaleResolutionStrategyImpl.STRATEGY_NAME,
      DefaultLocaleResolutionStrategyImpl.STRATEGY_VERSION,
      DefaultLocaleResolutionStrategyImpl.FALLBACK_LOCALE,
    );
  }

  override resolveLocale(): string {
    return this.currentLocale;
  }
}

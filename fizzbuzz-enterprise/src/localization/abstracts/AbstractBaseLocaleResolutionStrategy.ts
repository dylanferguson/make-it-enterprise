import type { ILocaleResolutionStrategy } from "../contracts/ILocaleResolutionStrategy.js";

export abstract class AbstractBaseLocaleResolutionStrategy implements ILocaleResolutionStrategy {
  private static readonly DEFAULT_STRATEGY_NAME = "AbstractBaseLocaleResolutionStrategy";
  private static readonly DEFAULT_STRATEGY_VERSION = "1.0.0-LOCALE-STRATEGY";
  private static readonly DEFAULT_LOCALE = "en_US";

  private readonly strategyName: string;
  private readonly strategyVersion: string;
  protected currentLocale: string;
  protected localeOverridden: boolean;

  constructor(
    strategyName: string = AbstractBaseLocaleResolutionStrategy.DEFAULT_STRATEGY_NAME,
    strategyVersion: string = AbstractBaseLocaleResolutionStrategy.DEFAULT_STRATEGY_VERSION,
    defaultLocale: string = AbstractBaseLocaleResolutionStrategy.DEFAULT_LOCALE,
  ) {
    this.strategyName = strategyName;
    this.strategyVersion = strategyVersion;
    this.currentLocale = defaultLocale;
    this.localeOverridden = false;
  }

  getStrategyName(): string {
    return this.strategyName;
  }

  getStrategyVersion(): string {
    return this.strategyVersion;
  }

  abstract resolveLocale(): string;

  setLocale(locale: string): void {
    this.validateLocale(locale);
    this.currentLocale = locale;
    this.localeOverridden = true;
  }

  getDefaultLocale(): string {
    return AbstractBaseLocaleResolutionStrategy.DEFAULT_LOCALE;
  }

  isLocaleOverridden(): boolean {
    return this.localeOverridden;
  }

  protected validateLocale(locale: string): void {
    if (!locale || locale.trim().length === 0) {
      throw new Error(
        `[${this.strategyName}] Invalid locale: must be non-empty string`,
      );
    }
  }
}

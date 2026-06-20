import { AbstractBaseLocaleResolutionStrategy } from "../../abstracts/AbstractBaseLocaleResolutionStrategy.js";

export class ThreadLocalLocaleResolutionStrategyImpl extends AbstractBaseLocaleResolutionStrategy {
  private static readonly STRATEGY_NAME = "ThreadLocalLocaleResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-THREADLOCAL-LOCALE-STRATEGY";
  private static readonly FALLBACK_LOCALE = "en_US";

  private static readonly threadLocalLocale: { get(): string; set(value: string): void } = (() => {
    let stored: string = ThreadLocalLocaleResolutionStrategyImpl.FALLBACK_LOCALE;
    return {
      get(): string {
        return stored;
      },
      set(value: string): void {
        stored = value;
      },
    };
  })();

  constructor() {
    super(
      ThreadLocalLocaleResolutionStrategyImpl.STRATEGY_NAME,
      ThreadLocalLocaleResolutionStrategyImpl.STRATEGY_VERSION,
      ThreadLocalLocaleResolutionStrategyImpl.FALLBACK_LOCALE,
    );
  }

  override resolveLocale(): string {
    return ThreadLocalLocaleResolutionStrategyImpl.threadLocalLocale.get();
  }

  override setLocale(locale: string): void {
    this.validateLocale(locale);
    ThreadLocalLocaleResolutionStrategyImpl.threadLocalLocale.set(locale);
    this.currentLocale = locale;
    this.localeOverridden = true;
  }

  static getCurrentThreadLocale(): string {
    return ThreadLocalLocaleResolutionStrategyImpl.threadLocalLocale.get();
  }

  static setCurrentThreadLocale(locale: string): void {
    ThreadLocalLocaleResolutionStrategyImpl.threadLocalLocale.set(locale);
  }
}

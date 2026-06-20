export interface ILocaleResolutionStrategy {
  getStrategyName(): string;
  getStrategyVersion(): string;
  resolveLocale(): string;
  setLocale(locale: string): void;
  getDefaultLocale(): string;
  isLocaleOverridden(): boolean;
}

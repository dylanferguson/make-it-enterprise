import type { ILocalizedMessageResolutionConfigurationProvider } from "../../contracts/ILocalizedMessageResolutionConfigurationProvider.js";
import type { FizzBuzzOutputMessageCode } from "../messagecodes/FizzBuzzOutputMessageCodeImpl.js";

export class StandardLocalizedMessageResolutionConfigurationProviderImpl
  implements ILocalizedMessageResolutionConfigurationProvider
{
  private static readonly PROVIDER_NAME = "StandardLocalizedMessageResolutionConfigurationProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-MESSAGE-CONFIG-PROVIDER";
  private static readonly DEFAULT_RESOURCE_BUNDLE_BASE = "META-INF.fizzbuzz-output-messages";
  private static readonly CONFIGURED_LOCALES: readonly string[] = ["en_US"];
  private static readonly DEFAULT_LOCALE = "en_US";

  private readonly locales: readonly string[];
  private readonly resourceBundleBaseName: string;
  private readonly localeOverrides: Map<string, string>;

  constructor(
    locales?: readonly string[],
    resourceBundleBaseName?: string,
  ) {
    this.locales = locales ?? StandardLocalizedMessageResolutionConfigurationProviderImpl.CONFIGURED_LOCALES;
    this.resourceBundleBaseName = resourceBundleBaseName ?? StandardLocalizedMessageResolutionConfigurationProviderImpl.DEFAULT_RESOURCE_BUNDLE_BASE;
    this.localeOverrides = new Map();
  }

  getConfigurationProviderName(): string {
    return StandardLocalizedMessageResolutionConfigurationProviderImpl.PROVIDER_NAME;
  }

  getConfigurationProviderVersion(): string {
    return StandardLocalizedMessageResolutionConfigurationProviderImpl.PROVIDER_VERSION;
  }

  getConfiguredLocales(): readonly string[] {
    return this.locales;
  }

  getDefaultLocale(): string {
    return StandardLocalizedMessageResolutionConfigurationProviderImpl.DEFAULT_LOCALE;
  }

  getResourceBundleBaseName(): string {
    return this.resourceBundleBaseName;
  }

  resolveMessageCodeMapping(messageCode: FizzBuzzOutputMessageCode): string {
    const override = this.localeOverrides.get(messageCode.getCodeName());
    return override ?? messageCode.getResourceBundleKey();
  }

  registerLocaleOverride(codeName: string, resourceKey: string): void {
    this.localeOverrides.set(codeName, resourceKey);
  }

  getConfigurationSummary(): Record<string, unknown> {
    return {
      providerName: this.getConfigurationProviderName(),
      providerVersion: this.getConfigurationProviderVersion(),
      locales: Array.from(this.locales),
      defaultLocale: this.getDefaultLocale(),
      resourceBundleBase: this.resourceBundleBaseName,
      localeOverrides: Object.fromEntries(this.localeOverrides),
    };
  }
}

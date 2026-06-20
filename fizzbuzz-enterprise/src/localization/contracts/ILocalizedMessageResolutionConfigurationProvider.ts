import type { FizzBuzzOutputMessageCode } from "../impl/messagecodes/FizzBuzzOutputMessageCodeImpl.js";

export interface ILocalizedMessageResolutionConfigurationProvider {
  getConfigurationProviderName(): string;
  getConfigurationProviderVersion(): string;
  getConfiguredLocales(): readonly string[];
  getDefaultLocale(): string;
  getResourceBundleBaseName(): string;
  resolveMessageCodeMapping(
    messageCode: FizzBuzzOutputMessageCode,
  ): string;
}

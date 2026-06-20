import { AbstractBaseLocalizedMessageResolver } from "../../abstracts/AbstractBaseLocalizedMessageResolver.js";
import type { FizzBuzzOutputMessageCode } from "../messagecodes/FizzBuzzOutputMessageCodeImpl.js";
import type { ILocaleResolutionStrategy } from "../../contracts/ILocaleResolutionStrategy.js";
import type { ILocalizedMessageResolutionChainHandler } from "../../contracts/ILocalizedMessageResolutionChainHandler.js";

export class ResourceBundleBackedLocalizedMessageResolverImpl
  extends AbstractBaseLocalizedMessageResolver
{
  private static readonly RESOLVER_NAME = "ResourceBundleBackedLocalizedMessageResolver";
  private static readonly RESOLVER_VERSION = "1.0.0-RESOURCEBUNDLE-RESOLVER";

  private readonly chainHandler: ILocalizedMessageResolutionChainHandler;
  private readonly localeStrategy: ILocaleResolutionStrategy;
  private readonly supportedLocales: Set<string>;

  constructor(
    chainHandler: ILocalizedMessageResolutionChainHandler,
    localeStrategy: ILocaleResolutionStrategy,
    supportedLocales: readonly string[] = ["en_US"],
  ) {
    super(
      ResourceBundleBackedLocalizedMessageResolverImpl.RESOLVER_NAME,
      ResourceBundleBackedLocalizedMessageResolverImpl.RESOLVER_VERSION,
    );
    this.chainHandler = chainHandler;
    this.localeStrategy = localeStrategy;
    this.supportedLocales = new Set(supportedLocales);
  }

  override resolveMessage(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string {
    this.validateMessageCode(messageCode);
    this.validateLocale(locale);

    const effectiveLocale = this.resolveEffectiveLocale(locale);
    return this.chainHandler.handleMessageResolution(messageCode, args, effectiveLocale);
  }

  override getSupportedLocales(): readonly string[] {
    return Array.from(this.supportedLocales);
  }

  override isLocaleSupported(locale: string): boolean {
    return this.supportedLocales.has(locale);
  }

  getLocaleStrategy(): ILocaleResolutionStrategy {
    return this.localeStrategy;
  }

  getChainHandler(): ILocalizedMessageResolutionChainHandler {
    return this.chainHandler;
  }

  registerLocale(locale: string): void {
    if (!locale || locale.trim().length === 0) {
      throw new Error(
        `[${ResourceBundleBackedLocalizedMessageResolverImpl.RESOLVER_NAME}] ` +
        `Cannot register empty locale`,
      );
    }
    this.supportedLocales.add(locale);
  }

  private resolveEffectiveLocale(requestedLocale: string): string {
    if (this.supportedLocales.has(requestedLocale)) {
      return requestedLocale;
    }
    const strategyLocale = this.localeStrategy.resolveLocale();
    if (this.supportedLocales.has(strategyLocale)) {
      return strategyLocale;
    }
    return this.localeStrategy.getDefaultLocale();
  }
}

import type { ILocalizedMessageResolver } from "../contracts/ILocalizedMessageResolver.js";
import type { FizzBuzzOutputMessageCode } from "../impl/messagecodes/FizzBuzzOutputMessageCodeImpl.js";

export abstract class AbstractBaseLocalizedMessageResolver implements ILocalizedMessageResolver {
  private static readonly DEFAULT_RESOLVER_NAME = "AbstractBaseLocalizedMessageResolver";
  private static readonly DEFAULT_RESOLVER_VERSION = "1.0.0-LOCALIZED-RESOLVER";

  private readonly resolverName: string;
  private readonly resolverVersion: string;

  constructor(
    resolverName: string = AbstractBaseLocalizedMessageResolver.DEFAULT_RESOLVER_NAME,
    resolverVersion: string = AbstractBaseLocalizedMessageResolver.DEFAULT_RESOLVER_VERSION,
  ) {
    this.resolverName = resolverName;
    this.resolverVersion = resolverVersion;
  }

  getResolverName(): string {
    return this.resolverName;
  }

  getResolverVersion(): string {
    return this.resolverVersion;
  }

  abstract resolveMessage(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string;

  resolveMessageOrDefault(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
    defaultValue: string,
  ): string {
    try {
      const resolved = this.resolveMessage(messageCode, args, locale);
      if (resolved === null || resolved === undefined) {
        return this.formatDefaultMessage(messageCode, args, defaultValue);
      }
      return resolved;
    } catch {
      return this.formatDefaultMessage(messageCode, args, defaultValue);
    }
  }

  abstract getSupportedLocales(): readonly string[];

  abstract isLocaleSupported(locale: string): boolean;

  protected formatDefaultMessage(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    defaultValue: string,
  ): string {
    if (defaultValue.includes("{0}") && args.length > 0) {
      return defaultValue.replace(/\{(\d+)\}/g, (_match: string, index: string): string => {
        const idx = parseInt(index, 10);
        return idx < args.length && args[idx] !== undefined ? args[idx] as string : `{${idx}}`;
      });
    }
    return defaultValue;
  }

  protected validateMessageCode(messageCode: FizzBuzzOutputMessageCode): void {
    if (!messageCode) {
      throw new Error(
        `[${this.resolverName}] Message code must not be null or undefined`,
      );
    }
  }

  protected validateLocale(locale: string): void {
    if (!locale || locale.trim().length === 0) {
      throw new Error(
        `[${this.resolverName}] Locale must not be null, undefined, or empty`,
      );
    }
  }
}

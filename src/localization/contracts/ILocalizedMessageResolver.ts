import type { FizzBuzzOutputMessageCode } from "../impl/messagecodes/FizzBuzzOutputMessageCodeImpl.js";

export interface ILocalizedMessageResolver {
  getResolverName(): string;
  getResolverVersion(): string;
  resolveMessage(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string;
  resolveMessageOrDefault(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
    defaultValue: string,
  ): string;
  getSupportedLocales(): readonly string[];
  isLocaleSupported(locale: string): boolean;
}

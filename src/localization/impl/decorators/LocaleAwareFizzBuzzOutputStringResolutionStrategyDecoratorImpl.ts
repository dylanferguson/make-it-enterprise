import type { IFizzBuzzOutputStringResolutionStrategy } from "../../../outputresolution/contracts/index.js";
import type { ILocalizedMessageResolver } from "../../contracts/ILocalizedMessageResolver.js";
import type { ILocaleResolutionStrategy } from "../../contracts/ILocaleResolutionStrategy.js";
import { FizzBuzzOutputMessageCode } from "../../impl/messagecodes/FizzBuzzOutputMessageCodeImpl.js";
import { LocalizedMessageResolverFactoryBeanFactory } from "../../impl/factories/LocalizedMessageResolverFactoryBeanFactory.js";
import { LocaleResolutionStrategyFactoryBeanFactory } from "../../impl/factories/LocaleResolutionStrategyFactoryBeanFactory.js";
import { DefaultLocaleResolutionStrategyImpl } from "../../impl/locales/DefaultLocaleResolutionStrategyImpl.js";

export class LocaleAwareFizzBuzzOutputStringResolutionStrategyDecoratorImpl
  implements IFizzBuzzOutputStringResolutionStrategy
{
  private static readonly DECORATOR_NAME = "LocaleAwareFizzBuzzOutputStringResolutionStrategyDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-LOCALE-AWARE-DECORATOR";

  private readonly decorated: IFizzBuzzOutputStringResolutionStrategy;
  private readonly messageResolver: ILocalizedMessageResolver;
  private readonly localeStrategy: ILocaleResolutionStrategy;

  constructor(
    decorated: IFizzBuzzOutputStringResolutionStrategy,
    messageResolver?: ILocalizedMessageResolver,
    localeStrategy?: ILocaleResolutionStrategy,
  ) {
    this.decorated = decorated;
    this.messageResolver = messageResolver
      ?? LocalizedMessageResolverFactoryBeanFactory.getResolver()!
      ?? LocalizedMessageResolverFactoryBeanFactory.createResolver(
          LocaleResolutionStrategyFactoryBeanFactory.createLocaleResolutionStrategy("DEFAULT") as any,
        );
    this.localeStrategy = localeStrategy
      ?? LocalizedMessageResolverFactoryBeanFactory.getLocaleStrategy()
      ?? new DefaultLocaleResolutionStrategyImpl();
  }

  getName(): string {
    return `${this.decorated.getName()}DecoratedWith${LocaleAwareFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_NAME}`;
  }

  getVersion(): string {
    return LocaleAwareFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_VERSION;
  }

  getPriority(): number {
    return this.decorated.getPriority();
  }

  getResolvedIdentifier(): string {
    return `LOCALE_AWARE_${this.decorated.getResolvedIdentifier()}`;
  }

  canResolve(value: number): boolean {
    return this.decorated.canResolve(value);
  }

  resolve(value: number): string {
    const originalResult = this.decorated.resolve(value);
    const messageCode = this.resolveMessageCodeForStrategy(
      this.decorated.getResolvedIdentifier(),
      originalResult,
      value,
    );
    if (messageCode === null) {
      return originalResult;
    }
    const locale = this.localeStrategy.resolveLocale();
    const args = messageCode === FizzBuzzOutputMessageCode.NUMBER ? [originalResult] : [];
    return this.messageResolver.resolveMessageOrDefault(
      messageCode,
      args,
      locale,
      originalResult,
    );
  }

  getDecorated(): IFizzBuzzOutputStringResolutionStrategy {
    return this.decorated;
  }

  private resolveMessageCodeForStrategy(
    resolvedIdentifier: string,
    originalResult: string,
    value: number,
  ): FizzBuzzOutputMessageCode | null {
    switch (resolvedIdentifier) {
      case "FIZZBUZZ_MULTIWORD_OUTPUT_IDENTIFIER":
      case "FIZZBUZZ_ENTERPRISE_FACADE_DELEGATED":
        return FizzBuzzOutputMessageCode.FIZZBUZZ;
      case "FIZZ_OUTPUT_IDENTIFIER":
      case "FIZZ_ENTERPRISE_FACADE_DELEGATED":
        return FizzBuzzOutputMessageCode.FIZZ;
      case "BUZZ_OUTPUT_IDENTIFIER":
      case "BUZZ_ENTERPRISE_FACADE_DELEGATED":
        return FizzBuzzOutputMessageCode.BUZZ;
      case "NUMBER_PASSTHROUGH_OUTPUT_IDENTIFIER":
      case "NUMBER_ENTERPRISE_FACADE_DELEGATED":
        return FizzBuzzOutputMessageCode.NUMBER;
      default: {
        if (originalResult === "FizzBuzz") return FizzBuzzOutputMessageCode.FIZZBUZZ;
        if (originalResult === "Fizz") return FizzBuzzOutputMessageCode.FIZZ;
        if (originalResult === "Buzz") return FizzBuzzOutputMessageCode.BUZZ;
        return null;
      }
    }
  }
}

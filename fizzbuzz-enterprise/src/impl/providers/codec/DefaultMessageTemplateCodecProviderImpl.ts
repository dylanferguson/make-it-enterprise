import { AbstractBaseMessageTemplateCodecProvider } from "../../../abstracts/AbstractBaseMessageTemplateCodecProvider.js";
import type { IMessagePropertyResolutionChain } from "../../../contracts/IMessagePropertyResolutionChain.js";

export class DefaultMessageTemplateCodecProviderImpl extends AbstractBaseMessageTemplateCodecProvider {
  private static readonly PROVIDER_NAME = "DefaultMessageTemplateCodecProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-MESSAGE-CODEC-PROVIDER";

  private static readonly FIZZ_TEMPLATE_KEY = "message.template.codec.fizz";
  private static readonly BUZZ_TEMPLATE_KEY = "message.template.codec.buzz";
  private static readonly FIZZBUZZ_TEMPLATE_KEY = "message.template.codec.fizzbuzz";
  private static readonly DIVISIBLE_RESULT_KEY = "message.template.codec.divisible.result";
  private static readonly NOT_DIVISIBLE_RESULT_KEY = "message.template.codec.not.divisible.result";

  private static readonly DEFAULT_FIZZ = "Fizz";
  private static readonly DEFAULT_BUZZ = "Buzz";
  private static readonly DEFAULT_FIZZBUZZ = "FizzBuzz";
  private static readonly DEFAULT_DIVISIBLE_RESULT = "DIVISIBLE";
  private static readonly DEFAULT_NOT_DIVISIBLE_RESULT = "NOT_DIVISIBLE";

  constructor(propertyResolutionChain: IMessagePropertyResolutionChain) {
    super(propertyResolutionChain);
  }

  override getProviderName(): string {
    return DefaultMessageTemplateCodecProviderImpl.PROVIDER_NAME;
  }

  override getProviderVersion(): string {
    return DefaultMessageTemplateCodecProviderImpl.PROVIDER_VERSION;
  }

  override getFizzTemplate(): string {
    return this.propertyResolutionChain.resolvePropertyWithFallback(
      DefaultMessageTemplateCodecProviderImpl.FIZZ_TEMPLATE_KEY,
      DefaultMessageTemplateCodecProviderImpl.DEFAULT_FIZZ,
    );
  }

  override getBuzzTemplate(): string {
    return this.propertyResolutionChain.resolvePropertyWithFallback(
      DefaultMessageTemplateCodecProviderImpl.BUZZ_TEMPLATE_KEY,
      DefaultMessageTemplateCodecProviderImpl.DEFAULT_BUZZ,
    );
  }

  override getFizzBuzzTemplate(): string {
    return this.propertyResolutionChain.resolvePropertyWithFallback(
      DefaultMessageTemplateCodecProviderImpl.FIZZBUZZ_TEMPLATE_KEY,
      DefaultMessageTemplateCodecProviderImpl.DEFAULT_FIZZBUZZ,
    );
  }

  override getDivisibleResultTemplate(): string {
    return this.propertyResolutionChain.resolvePropertyWithFallback(
      DefaultMessageTemplateCodecProviderImpl.DIVISIBLE_RESULT_KEY,
      DefaultMessageTemplateCodecProviderImpl.DEFAULT_DIVISIBLE_RESULT,
    );
  }

  override getNotDivisibleResultTemplate(): string {
    return this.propertyResolutionChain.resolvePropertyWithFallback(
      DefaultMessageTemplateCodecProviderImpl.NOT_DIVISIBLE_RESULT_KEY,
      DefaultMessageTemplateCodecProviderImpl.DEFAULT_NOT_DIVISIBLE_RESULT,
    );
  }
}

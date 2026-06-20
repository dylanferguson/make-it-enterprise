import { AbstractBaseLocalizedMessageResolutionChainHandler } from "../../abstracts/AbstractBaseLocalizedMessageResolutionChainHandler.js";
import { FizzBuzzOutputMessageCode } from "../messagecodes/FizzBuzzOutputMessageCodeImpl.js";

export class StandardLocalizedMessageResolutionChainHandlerImpl
  extends AbstractBaseLocalizedMessageResolutionChainHandler
{
  private static readonly HANDLER_NAME = "StandardLocalizedMessageResolutionChainHandler";
  private static readonly HANDLER_VERSION = "1.0.0-STANDARD-MESSAGE-CHAIN-HANDLER";

  private readonly resourceBundle: Map<string, Map<string, string>>;

  constructor(resourceBundle?: Map<string, Map<string, string>>) {
    super(
      StandardLocalizedMessageResolutionChainHandlerImpl.HANDLER_NAME,
      StandardLocalizedMessageResolutionChainHandlerImpl.HANDLER_VERSION,
    );
    this.resourceBundle = resourceBundle ?? StandardLocalizedMessageResolutionChainHandlerImpl.buildDefaultResourceBundle();
  }

  override handleMessageResolution(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string {
    this.validateResolutionInputs(messageCode, locale);

    const localeMessages = this.resourceBundle.get(locale);
    if (localeMessages !== undefined) {
      const resolved = localeMessages.get(messageCode.getResourceBundleKey());
      if (resolved !== undefined) {
        return StandardLocalizedMessageResolutionChainHandlerImpl.applyArgs(resolved, args);
      }
    }

    const defaultLocaleMessages = this.resourceBundle.get("en_US");
    if (defaultLocaleMessages !== undefined) {
      const resolved = defaultLocaleMessages.get(messageCode.getResourceBundleKey());
      if (resolved !== undefined) {
        return StandardLocalizedMessageResolutionChainHandlerImpl.applyArgs(resolved, args);
      }
    }

    return this.proceedToNext(messageCode, args, locale);
  }

  protected override getUnresolvedFallback(messageCode: FizzBuzzOutputMessageCode): string {
    return FizzBuzzOutputMessageCode.getDefaultMessage(messageCode);
  }

  registerMessage(locale: string, key: string, value: string): void {
    if (!this.resourceBundle.has(locale)) {
      this.resourceBundle.set(locale, new Map());
    }
    this.resourceBundle.get(locale)!.set(key, value);
  }

  getRegisteredLocaleCount(): number {
    return this.resourceBundle.size;
  }

  getRegisteredMessageCount(locale: string): number {
    return this.resourceBundle.get(locale)?.size ?? 0;
  }

  private static applyArgs(template: string, args: readonly string[]): string {
    if (args.length === 0 || !template.includes("{")) {
      return template;
    }
    return template.replace(/\{(\d+)\}/g, (_match: string, index: string): string => {
      const idx = parseInt(index, 10);
      return idx < args.length && args[idx] !== undefined ? args[idx] as string : `{${idx}}`;
    });
  }

  private static buildDefaultResourceBundle(): Map<string, Map<string, string>> {
    const bundle = new Map<string, Map<string, string>>();
    const enUs = new Map<string, string>();
    enUs.set("fizzbuzz.output.message.fizz", "Fizz");
    enUs.set("fizzbuzz.output.message.buzz", "Buzz");
    enUs.set("fizzbuzz.output.message.fizzbuzz", "FizzBuzz");
    enUs.set("fizzbuzz.output.message.number", "{0}");
    bundle.set("en_US", enUs);
    return bundle;
  }
}

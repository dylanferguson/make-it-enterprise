import { AbstractBaseLocalizedMessageResolutionChainHandler } from "../../abstracts/AbstractBaseLocalizedMessageResolutionChainHandler.js";
import { FizzBuzzOutputMessageCode } from "../messagecodes/FizzBuzzOutputMessageCodeImpl.js";

export class ValidatingLocalizedMessageResolutionChainHandlerDecoratorImpl
  extends AbstractBaseLocalizedMessageResolutionChainHandler
{
  private static readonly HANDLER_NAME = "ValidatingLocalizedMessageResolutionChainHandlerDecorator";
  private static readonly HANDLER_VERSION = "1.0.0-VALIDATING-MESSAGE-CHAIN-DECORATOR";

  constructor() {
    super(
      ValidatingLocalizedMessageResolutionChainHandlerDecoratorImpl.HANDLER_NAME,
      ValidatingLocalizedMessageResolutionChainHandlerDecoratorImpl.HANDLER_VERSION,
    );
  }

  override handleMessageResolution(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string {
    this.validateResolutionInputs(messageCode, locale);
    this.validateMessageCodeExists(messageCode);
    this.validateArgs(args);
    return this.proceedToNext(messageCode, args, locale);
  }

  protected override getUnresolvedFallback(messageCode: FizzBuzzOutputMessageCode): string {
    return FizzBuzzOutputMessageCode.getDefaultMessage(messageCode);
  }

  private validateMessageCodeExists(messageCode: FizzBuzzOutputMessageCode): void {
    const existing = FizzBuzzOutputMessageCode.valueOf(messageCode.getCodeName());
    if (existing === null) {
      throw new Error(
        `[${ValidatingLocalizedMessageResolutionChainHandlerDecoratorImpl.HANDLER_NAME}] ` +
        `Unrecognized message code: ${messageCode.getCodeName()}`,
      );
    }
  }

  private validateArgs(args: readonly string[]): void {
    for (let i = 0; i < args.length; i++) {
      if (args[i] === null || args[i] === undefined) {
        throw new Error(
          `[${ValidatingLocalizedMessageResolutionChainHandlerDecoratorImpl.HANDLER_NAME}] ` +
          `Argument at index ${i} is null or undefined`,
        );
      }
    }
  }
}

import type { ILocalizedMessageResolutionChainHandler } from "../contracts/ILocalizedMessageResolutionChainHandler.js";
import type { FizzBuzzOutputMessageCode } from "../impl/messagecodes/FizzBuzzOutputMessageCodeImpl.js";

export abstract class AbstractBaseLocalizedMessageResolutionChainHandler
  implements ILocalizedMessageResolutionChainHandler
{
  private static readonly DEFAULT_HANDLER_NAME = "AbstractBaseLocalizedMessageResolutionChainHandler";
  private static readonly DEFAULT_HANDLER_VERSION = "1.0.0-MESSAGE-CHAIN-HANDLER";

  private readonly handlerName: string;
  private readonly handlerVersion: string;
  private next: ILocalizedMessageResolutionChainHandler | null = null;

  constructor(
    handlerName: string = AbstractBaseLocalizedMessageResolutionChainHandler.DEFAULT_HANDLER_NAME,
    handlerVersion: string = AbstractBaseLocalizedMessageResolutionChainHandler.DEFAULT_HANDLER_VERSION,
  ) {
    this.handlerName = handlerName;
    this.handlerVersion = handlerVersion;
  }

  getChainHandlerName(): string {
    return this.handlerName;
  }

  getChainHandlerVersion(): string {
    return this.handlerVersion;
  }

  abstract handleMessageResolution(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string;

  setNext(handler: ILocalizedMessageResolutionChainHandler | null): void {
    this.next = handler;
  }

  getNext(): ILocalizedMessageResolutionChainHandler | null {
    return this.next;
  }

  protected proceedToNext(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string {
    if (this.next !== null) {
      return this.next.handleMessageResolution(messageCode, args, locale);
    }
    return this.getUnresolvedFallback(messageCode);
  }

  protected abstract getUnresolvedFallback(messageCode: FizzBuzzOutputMessageCode): string;

  protected validateResolutionInputs(
    messageCode: FizzBuzzOutputMessageCode,
    locale: string,
  ): void {
    if (!messageCode) {
      throw new Error(
        `[${this.handlerName}] Cannot resolve null message code`,
      );
    }
    if (!locale || locale.trim().length === 0) {
      throw new Error(
        `[${this.handlerName}] Cannot resolve message for empty locale`,
      );
    }
  }
}

import type { FizzBuzzOutputMessageCode } from "../impl/messagecodes/FizzBuzzOutputMessageCodeImpl.js";

export interface ILocalizedMessageResolutionChainHandler {
  getChainHandlerName(): string;
  getChainHandlerVersion(): string;
  handleMessageResolution(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string;
  setNext(handler: ILocalizedMessageResolutionChainHandler | null): void;
  getNext(): ILocalizedMessageResolutionChainHandler | null;
}

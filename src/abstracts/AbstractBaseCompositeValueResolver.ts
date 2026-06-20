import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";
import type { IHandler } from "../contracts/IHandler.js";

export abstract class AbstractBaseCompositeValueResolver implements ICompositeValueResolver {
  protected readonly handlerChain: IHandler<number, string>;

  constructor(handlerChain: IHandler<number, string>) {
    this.handlerChain = handlerChain;
  }

  abstract resolve(value: number): string;

  protected executeHandlerChain(value: number): string {
    return this.handlerChain.handle(value);
  }
}

import { AbstractBaseCompositeValueResolver } from "../../abstracts/AbstractBaseCompositeValueResolver.js";
import type { IHandler } from "../../contracts/IHandler.js";

export class CompositeValueResolverImpl extends AbstractBaseCompositeValueResolver {
  constructor(handlerChain: IHandler<number, string>) {
    super(handlerChain);
  }

  override resolve(value: number): string {
    return this.executeHandlerChain(value);
  }
}

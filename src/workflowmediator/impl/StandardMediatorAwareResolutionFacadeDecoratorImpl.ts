import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionMediator } from "../contracts/IFizzBuzzResolutionMediator.js";
import { AbstractBaseMediatorAwareResolutionFacadeDecorator } from "../abstracts/AbstractBaseMediatorAwareResolutionFacadeDecorator.js";

export class StandardMediatorAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseMediatorAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "StandardMediatorAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-MEDIATOR-DECORATOR";

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    mediator: IFizzBuzzResolutionMediator,
    decoratorEnabled: boolean,
  ) {
    super(
      StandardMediatorAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME,
      StandardMediatorAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION,
      wrappedFacade,
      mediator,
      decoratorEnabled,
    );
  }

  override resolveValue(value: number): string {
    if (this.isDecoratorEnabled()) {
      const mediatorResult = this.getMediator().mediateSingleValueResolution(value);
      if (mediatorResult !== null && mediatorResult !== undefined) {
        return mediatorResult;
      }
    }
    return this.getWrappedFacade().resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    if (this.isDecoratorEnabled()) {
      const mediatorResult = this.getMediator().mediateRangeResolution(start, end);
      if (mediatorResult !== null && mediatorResult !== undefined) {
        return mediatorResult;
      }
    }
    return this.getWrappedFacade().resolveRange(start, end);
  }
}

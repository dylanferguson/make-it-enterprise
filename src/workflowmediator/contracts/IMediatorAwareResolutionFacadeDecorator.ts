import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionMediator } from "./IFizzBuzzResolutionMediator.js";

export interface IMediatorAwareResolutionFacadeDecorator extends IFizzBuzzSingleValueResolutionFacade {
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getMediator(): IFizzBuzzResolutionMediator;
  isDecoratorEnabled(): boolean;
}

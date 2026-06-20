import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionInvocationHandler } from "./IFizzBuzzResolutionInvocationHandler.js";
import type { IFizzBuzzResolutionProxyFactory } from "./IFizzBuzzResolutionProxyFactory.js";

export interface IInvocationAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;

  getInvocationHandler(): IFizzBuzzResolutionInvocationHandler;

  getProxyFactory(): IFizzBuzzResolutionProxyFactory;

  getDecoratorName(): string;

  getDecoratorVersion(): string;

  isProxyInvocationEnabled(): boolean;
}

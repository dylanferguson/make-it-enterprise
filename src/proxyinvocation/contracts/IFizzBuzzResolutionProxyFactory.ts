import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionInvocationHandler } from "./IFizzBuzzResolutionInvocationHandler.js";

export interface IFizzBuzzResolutionProxyFactory {
  createProxy(
    target: IFizzBuzzSingleValueResolutionFacade,
    handler: IFizzBuzzResolutionInvocationHandler,
  ): IFizzBuzzSingleValueResolutionFacade;

  getFactoryName(): string;

  getFactoryVersion(): string;
}

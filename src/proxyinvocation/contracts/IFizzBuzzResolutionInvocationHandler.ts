import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export interface IFizzBuzzResolutionInvocationHandler {
  invokeResolveValue(
    proxy: IFizzBuzzSingleValueResolutionFacade,
    value: number,
    delegate: IFizzBuzzSingleValueResolutionFacade,
  ): string;

  invokeResolveRange(
    proxy: IFizzBuzzSingleValueResolutionFacade,
    start: number,
    end: number,
    delegate: IFizzBuzzSingleValueResolutionFacade,
  ): readonly string[];

  getHandlerName(): string;

  getHandlerVersion(): string;

  getInterceptionCount(): number;
}

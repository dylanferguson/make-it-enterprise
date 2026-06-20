import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionInvocationHandler } from "../contracts/IFizzBuzzResolutionInvocationHandler.js";

export abstract class AbstractBaseFizzBuzzResolutionInvocationHandler
  implements IFizzBuzzResolutionInvocationHandler
{
  protected static readonly HANDLER_CONTEXT_PREFIX = "proxy:invocation:hdlr";

  protected interceptionCount: number = 0;

  abstract invokeResolveValue(
    proxy: IFizzBuzzSingleValueResolutionFacade,
    value: number,
    delegate: IFizzBuzzSingleValueResolutionFacade,
  ): string;

  abstract invokeResolveRange(
    proxy: IFizzBuzzSingleValueResolutionFacade,
    start: number,
    end: number,
    delegate: IFizzBuzzSingleValueResolutionFacade,
  ): readonly string[];

  abstract getHandlerName(): string;

  abstract getHandlerVersion(): string;

  getInterceptionCount(): number {
    return this.interceptionCount;
  }

  protected buildInvocationContext(value: number): string {
    return `${AbstractBaseFizzBuzzResolutionInvocationHandler.HANDLER_CONTEXT_PREFIX}:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }

  protected incrementInterceptionCount(): void {
    this.interceptionCount++;
  }
}

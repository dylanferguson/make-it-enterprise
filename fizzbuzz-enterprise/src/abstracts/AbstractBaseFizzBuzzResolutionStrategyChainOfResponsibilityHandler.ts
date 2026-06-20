import type { IFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";

export abstract class AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler
  implements IFizzBuzzResolutionStrategyChainOfResponsibilityHandler
{
  private nextHandler: IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null = null;

  abstract handleResolution(
    value: number,
    innerResolver: (value: number) => string,
    context: string | null,
  ): string | null;

  abstract canHandle(value: number): boolean;
  abstract getHandlerName(): string;
  abstract getHandlerPriority(): number;

  setNextHandler(next: IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null): void {
    this.nextHandler = next;
  }

  getNextHandler(): IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null {
    return this.nextHandler;
  }

  protected passToNext(
    value: number,
    innerResolver: (value: number) => string,
    context: string | null,
  ): string | null {
    if (this.nextHandler !== null) {
      return this.nextHandler.handleResolution(value, innerResolver, context);
    }
    return null;
  }
}

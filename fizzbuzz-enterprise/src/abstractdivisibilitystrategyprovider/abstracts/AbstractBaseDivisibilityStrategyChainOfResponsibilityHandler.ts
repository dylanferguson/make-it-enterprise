import type { IDivisibilityStrategyChainOfResponsibilityHandler } from "../contracts/IDivisibilityStrategyChainOfResponsibilityHandler.js";

export abstract class AbstractBaseDivisibilityStrategyChainOfResponsibilityHandler
  implements IDivisibilityStrategyChainOfResponsibilityHandler
{
  protected abstract readonly handlerName: string;
  protected abstract readonly handlerVersion: string;

  protected nextHandler: IDivisibilityStrategyChainOfResponsibilityHandler | null = null;

  abstract evaluateDivisibility(
    value: number,
    divisor: number,
    next: (v: number, d: number) => boolean,
  ): boolean;

  getHandlerName(): string {
    return this.handlerName;
  }

  getHandlerVersion(): string {
    return this.handlerVersion;
  }

  setNextHandler(handler: IDivisibilityStrategyChainOfResponsibilityHandler): void {
    this.nextHandler = handler;
  }

  getNextHandler(): IDivisibilityStrategyChainOfResponsibilityHandler | null {
    return this.nextHandler;
  }
}

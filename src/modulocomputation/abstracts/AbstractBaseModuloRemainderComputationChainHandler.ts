import type { IModuloRemainderComputationChainOfResponsibilityHandler } from "../contracts/index.js";

export abstract class AbstractBaseModuloRemainderComputationChainHandler
  implements IModuloRemainderComputationChainOfResponsibilityHandler
{
  protected static readonly CHAIN_FRAMEWORK_VERSION = "1.0.0-MRC-CHAIN-FRAMEWORK";

  protected readonly handlerName: string;
  protected readonly handlerVersion: string;
  protected nextHandler: IModuloRemainderComputationChainOfResponsibilityHandler | null;

  constructor(handlerName: string, handlerVersion: string) {
    this.handlerName = handlerName;
    this.handlerVersion = handlerVersion;
    this.nextHandler = null;
  }

  abstract evaluateRemainder(
    value: number,
    divisor: number,
    next: (v: number, d: number) => number,
  ): number;

  getHandlerName(): string {
    return this.handlerName;
  }

  getHandlerVersion(): string {
    return this.handlerVersion;
  }

  setNext(handler: IModuloRemainderComputationChainOfResponsibilityHandler): void {
    this.nextHandler = handler;
  }
}

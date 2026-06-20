import type { IDivisibilityOperatorDelegationChainHandler } from "../contracts/IDivisibilityOperatorDelegationChainHandler.js";

export abstract class AbstractBaseDivisibilityOperatorDelegationChainHandler
  implements IDivisibilityOperatorDelegationChainHandler
{
  private readonly handlerName: string;
  private readonly handlerVersion: string;
  private readonly handlerPriority: number;
  private nextHandler: IDivisibilityOperatorDelegationChainHandler | null = null;

  constructor(handlerName: string, handlerVersion: string, handlerPriority: number) {
    this.handlerName = handlerName;
    this.handlerVersion = handlerVersion;
    this.handlerPriority = handlerPriority;
  }

  getHandlerName(): string {
    return this.handlerName;
  }

  getHandlerVersion(): string {
    return this.handlerVersion;
  }

  getHandlerPriority(): number {
    return this.handlerPriority;
  }

  setNextHandler(next: IDivisibilityOperatorDelegationChainHandler): void {
    this.nextHandler = next;
  }

  getNextHandler(): IDivisibilityOperatorDelegationChainHandler | null {
    return this.nextHandler;
  }

  abstract evaluateDivisibility(dividend: number, divisor: number): boolean;
  abstract canHandle(dividend: number, divisor: number): boolean;

  protected proceedToNext(dividend: number, divisor: number): boolean {
    if (this.nextHandler !== null) {
      return this.nextHandler.evaluateDivisibility(dividend, divisor);
    }
    return false;
  }

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.handlerName}] Dividend must be finite, received: ${dividend}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.handlerName}] Division by zero intercepted at chain handler layer`,
      );
    }
  }
}

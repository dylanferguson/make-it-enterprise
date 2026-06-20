import type { IModuloOperationChainHandler } from "../contracts/IModuloOperationChainHandler.js";

export abstract class AbstractBaseModuloOperationChainHandler
  implements IModuloOperationChainHandler
{
  private nextHandler: IModuloOperationChainHandler | null = null;

  abstract handleModulo(dividend: number, divisor: number, context: string | null): number;
  abstract getHandlerName(): string;
  abstract getHandlerPriority(): number;

  setNext(handler: IModuloOperationChainHandler): IModuloOperationChainHandler {
    this.nextHandler = handler;
    return handler;
  }

  protected proceedToNext(dividend: number, divisor: number, context: string | null): number {
    if (this.nextHandler !== null) {
      return this.nextHandler.handleModulo(dividend, divisor, context);
    }
    throw new Error(
      `[${this.getHandlerName()}] Chain terminated: no handler available to compute modulo for ${dividend} / ${divisor}`,
    );
  }
}

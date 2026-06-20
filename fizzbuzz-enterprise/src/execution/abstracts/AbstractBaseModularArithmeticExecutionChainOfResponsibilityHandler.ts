import type { IModularArithmeticExecutionChainOfResponsibilityHandler } from "../contracts/index.js";

export abstract class AbstractBaseModularArithmeticExecutionChainOfResponsibilityHandler
  implements IModularArithmeticExecutionChainOfResponsibilityHandler
{
  private static readonly CHAIN_HANDLER_FRAMEWORK_VERSION = "1.0.0-EXECUTION-CHAIN-HANDLER-FRAMEWORK";

  private nextHandler: IModularArithmeticExecutionChainOfResponsibilityHandler | null = null;

  abstract getHandlerName(): string;
  abstract getHandlerVersion(): string;
  abstract getHandlerPriority(): number;
  abstract handle(value: number, next: (v: number) => string): string;

  setNext(handler: IModularArithmeticExecutionChainOfResponsibilityHandler): void {
    this.nextHandler = handler;
  }

  protected getNextHandler(): IModularArithmeticExecutionChainOfResponsibilityHandler | null {
    return this.nextHandler;
  }

  protected hasNextHandler(): boolean {
    return this.nextHandler !== null;
  }

  protected delegateToNext(value: number, terminal: (v: number) => string): string {
    if (this.nextHandler !== null) {
      return this.nextHandler.handle(value, terminal);
    }
    return terminal(value);
  }

  protected getChainHandlerFrameworkVersion(): string {
    return AbstractBaseModularArithmeticExecutionChainOfResponsibilityHandler.CHAIN_HANDLER_FRAMEWORK_VERSION;
  }
}

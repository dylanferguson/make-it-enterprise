import type { IDivisibleByFallbackComputationStrategyChainHandler } from "../contracts/IDivisibleByFallbackComputationStrategyChainHandler.js";

export abstract class AbstractBaseDivisibleByFallbackComputationStrategyChainHandler
  implements IDivisibleByFallbackComputationStrategyChainHandler
{
  private nextHandler: IDivisibleByFallbackComputationStrategyChainHandler | null = null;

  abstract handleFallbackComputation(dividend: number, divisor: number, computationContext: string): number;
  abstract getHandlerName(): string;
  abstract getHandlerPriority(): number;
  abstract canHandle(dividend: number, divisor: number): boolean;

  setNext(handler: IDivisibleByFallbackComputationStrategyChainHandler): IDivisibleByFallbackComputationStrategyChainHandler {
    this.nextHandler = handler;
    return handler;
  }

  protected proceedToNext(dividend: number, divisor: number, computationContext: string): number {
    if (this.nextHandler !== null) {
      return this.nextHandler.handleFallbackComputation(dividend, divisor, computationContext);
    }
    throw new Error(
      `[${this.getHandlerName()}] Fallback computation chain terminated: no handler available for ${dividend} / ${divisor}`,
    );
  }

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(`[${this.getHandlerName()}] Dividend must be finite, received: ${dividend}`);
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(`[${this.getHandlerName()}] Divisor must be finite, received: ${divisor}`);
    }
    if (divisor === 0) {
      throw new Error(`[${this.getHandlerName()}] Division by zero intercepted at fallback chain handler`);
    }
  }
}

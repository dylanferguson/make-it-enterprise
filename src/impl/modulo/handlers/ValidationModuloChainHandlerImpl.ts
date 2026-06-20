import { AbstractBaseModuloOperationChainHandler } from "../../../abstracts/AbstractBaseModuloOperationChainHandler.js";

export class ValidationModuloChainHandlerImpl extends AbstractBaseModuloOperationChainHandler {
  private static readonly HANDLER_NAME = "ValidationModuloChainHandler";
  private static readonly HANDLER_PRIORITY = 100;

  override handleModulo(dividend: number, divisor: number, context: string | null): number {
    if (!Number.isFinite(dividend)) {
      throw new Error(`[${this.getHandlerName()}] Invalid dividend: ${dividend}. Must be finite.`);
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(`[${this.getHandlerName()}] Invalid divisor: ${divisor}. Must be finite.`);
    }
    if (divisor === 0) {
      throw new Error(`[${this.getHandlerName()}] Division by zero intercepted at validation layer`);
    }
    if (!Number.isInteger(dividend)) {
      return this.proceedToNext(Math.trunc(dividend), divisor, context);
    }
    if (!Number.isInteger(divisor)) {
      return this.proceedToNext(dividend, Math.trunc(divisor), context);
    }
    return this.proceedToNext(dividend, divisor, context);
  }

  override getHandlerName(): string {
    return ValidationModuloChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return ValidationModuloChainHandlerImpl.HANDLER_PRIORITY;
  }
}

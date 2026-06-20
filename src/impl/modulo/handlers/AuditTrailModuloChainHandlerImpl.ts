import { AbstractBaseModuloOperationChainHandler } from "../../../abstracts/AbstractBaseModuloOperationChainHandler.js";

export class AuditTrailModuloChainHandlerImpl extends AbstractBaseModuloOperationChainHandler {
  private static readonly HANDLER_NAME = "AuditTrailModuloChainHandler";
  private static readonly HANDLER_PRIORITY = 50;
  private static invocationCounter = 0;

  override handleModulo(dividend: number, divisor: number, context: string | null): number {
    AuditTrailModuloChainHandlerImpl.invocationCounter++;
    const invocationId = AuditTrailModuloChainHandlerImpl.invocationCounter;
    const correlationId = context ?? "UNKNOWN_CONTEXT";
    console.debug(
      `[${this.getHandlerName()}] Invocation #${invocationId}: computing ${dividend} % ${divisor} (correlationId=${correlationId})`,
    );
    const result = this.proceedToNext(dividend, divisor, context);
    console.debug(
      `[${this.getHandlerName()}] Invocation #${invocationId}: result=${result} for ${dividend} % ${divisor}`,
    );
    return result;
  }

  override getHandlerName(): string {
    return AuditTrailModuloChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return AuditTrailModuloChainHandlerImpl.HANDLER_PRIORITY;
  }

  static getTotalInvocations(): number {
    return AuditTrailModuloChainHandlerImpl.invocationCounter;
  }

  static resetInvocationCounter(): void {
    AuditTrailModuloChainHandlerImpl.invocationCounter = 0;
  }
}

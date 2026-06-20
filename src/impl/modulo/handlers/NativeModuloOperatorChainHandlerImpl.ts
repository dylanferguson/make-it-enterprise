import { AbstractBaseModuloOperationChainHandler } from "../../../abstracts/AbstractBaseModuloOperationChainHandler.js";

export class NativeModuloOperatorChainHandlerImpl extends AbstractBaseModuloOperationChainHandler {
  private static readonly HANDLER_NAME = "NativeModuloOperatorChainHandler";
  private static readonly HANDLER_PRIORITY = 0;

  override handleModulo(dividend: number, divisor: number, context: string | null): number {
    let result = dividend % divisor;
    if (Object.is(result, -0)) {
      result = 0;
    }
    if (result < 0) {
      result = Math.abs(result);
    }
    return result;
  }

  override getHandlerName(): string {
    return NativeModuloOperatorChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return NativeModuloOperatorChainHandlerImpl.HANDLER_PRIORITY;
  }
}

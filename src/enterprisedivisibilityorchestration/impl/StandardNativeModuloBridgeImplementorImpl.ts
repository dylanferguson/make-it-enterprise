import { AbstractBaseEnterpriseDivisibilityOrchestrationBridgeImplementor } from "../abstracts/AbstractBaseEnterpriseDivisibilityOrchestrationBridgeImplementor.js";

export class StandardNativeModuloBridgeImplementorImpl
  extends AbstractBaseEnterpriseDivisibilityOrchestrationBridgeImplementor
{
  private static readonly IMPLEMENTOR_NAME = "StandardNativeModuloBridgeImplementor";
  private static readonly IMPLEMENTOR_VERSION = "1.0.0-NATIVE-MODULO-BRIDGE-IMPLEMENTOR";

  constructor() {
    super(
      StandardNativeModuloBridgeImplementorImpl.IMPLEMENTOR_NAME,
      StandardNativeModuloBridgeImplementorImpl.IMPLEMENTOR_VERSION,
    );
  }

  override computeRemainder(dividend: number, divisor: number): number {
    this.validateOperands(dividend, divisor);
    return dividend % divisor;
  }
}

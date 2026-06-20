import { AbstractBaseBridgeComputationImplementorImpl } from "../../abstracts/AbstractBaseBridgeComputationImplementorImpl.js";

export class NativeModuloBridgeComputationImplementorImpl
  extends AbstractBaseBridgeComputationImplementorImpl
{
  private static readonly IMPLEMENTOR_NAME = "NativeModuloBridgeComputationImplementor";
  private static readonly IMPLEMENTOR_VERSION = "1.0.0-NATIVE-MODULO-BRIDGE";

  constructor() {
    super(
      NativeModuloBridgeComputationImplementorImpl.IMPLEMENTOR_NAME,
      NativeModuloBridgeComputationImplementorImpl.IMPLEMENTOR_VERSION,
    );
  }

  override computeRemainder(dividend: number, divisor: number): number {
    return dividend % divisor;
  }
}


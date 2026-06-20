import { AbstractBaseModuloRemainderComputationCommand } from "../../abstracts/AbstractBaseModuloRemainderComputationCommand.js";

export class NativeJavaScriptModuloRemainderComputationCommandImpl
  extends AbstractBaseModuloRemainderComputationCommand
{
  private static readonly COMMAND_NAME = "NativeJavaScriptModuloRemainderComputationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-NATIVE-JS-MODULO";

  private static readonly VALIDATION_ENABLED = true;
  private static readonly MAX_SAFE_DIVIDEND = Number.MAX_SAFE_INTEGER;
  private static readonly MIN_DIVISOR_VALUE = 1;

  constructor() {
    super(
      NativeJavaScriptModuloRemainderComputationCommandImpl.COMMAND_NAME,
      NativeJavaScriptModuloRemainderComputationCommandImpl.COMMAND_VERSION,
    );
  }

  executeComputation(value: number, divisor: number): number {
    if (NativeJavaScriptModuloRemainderComputationCommandImpl.VALIDATION_ENABLED) {
      this.validateInputParameters(value, divisor);
    }
    return this.performNativeRemainderComputation(value, divisor);
  }

  private validateInputParameters(value: number, divisor: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[NativeJavaScriptModuloRemainderComputationCommand] Invalid dividend: ` +
        `value=[${value}], must be a finite number`,
      );
    }
    if (!Number.isInteger(value)) {
      throw new Error(
        `[NativeJavaScriptModuloRemainderComputationCommand] Non-integer dividend: ` +
        `value=[${value}], remainder computation requires integer operands`,
      );
    }
    if (Math.abs(value) > NativeJavaScriptModuloRemainderComputationCommandImpl.MAX_SAFE_DIVIDEND) {
      throw new Error(
        `[NativeJavaScriptModuloRemainderComputationCommand] Dividend exceeds safe range: ` +
        `value=[${value}], maxSafe=[${NativeJavaScriptModuloRemainderComputationCommandImpl.MAX_SAFE_DIVIDEND}]`,
      );
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(
        `[NativeJavaScriptModuloRemainderComputationCommand] Invalid divisor: ` +
        `divisor=[${divisor}], must be a finite number`,
      );
    }
    if (!Number.isInteger(divisor)) {
      throw new Error(
        `[NativeJavaScriptModuloRemainderComputationCommand] Non-integer divisor: ` +
        `divisor=[${divisor}], remainder computation requires integer operands`,
      );
    }
    if (divisor < NativeJavaScriptModuloRemainderComputationCommandImpl.MIN_DIVISOR_VALUE) {
      throw new Error(
        `[NativeJavaScriptModuloRemainderComputationCommand] Divisor below minimum: ` +
        `divisor=[${divisor}], min=[${NativeJavaScriptModuloRemainderComputationCommandImpl.MIN_DIVISOR_VALUE}]`,
      );
    }
  }

  private performNativeRemainderComputation(value: number, divisor: number): number {
    return value % divisor;
  }
}

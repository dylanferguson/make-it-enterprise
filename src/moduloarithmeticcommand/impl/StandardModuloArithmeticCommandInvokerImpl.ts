import type { IModuloArithmeticCommand } from "../contracts/IModuloArithmeticCommand.js";
import { AbstractBaseModuloArithmeticCommandInvoker } from "../abstracts/AbstractBaseModuloArithmeticCommandInvoker.js";

export class StandardModuloArithmeticCommandInvokerImpl extends AbstractBaseModuloArithmeticCommandInvoker {
  private static readonly INVOKER_NAME = "StandardModuloArithmeticCommandInvoker";
  private static readonly INVOKER_VERSION = "1.0.0-COMMAND-INVOKER";

  override getInvokerName(): string {
    return StandardModuloArithmeticCommandInvokerImpl.INVOKER_NAME;
  }

  override getInvokerVersion(): string {
    return StandardModuloArithmeticCommandInvokerImpl.INVOKER_VERSION;
  }

  protected override preInvoke(
    _command: IModuloArithmeticCommand,
    dividend: number,
    divisor: number,
  ): void {
    console.debug(
      `[${this.getInvokerName()}] Invoking modulo arithmetic command for ${dividend} % ${divisor}`,
    );
  }

  protected override postInvoke(
    _command: IModuloArithmeticCommand,
    dividend: number,
    divisor: number,
    result: number,
  ): void {
    console.debug(
      `[${this.getInvokerName()}] Modulo arithmetic command completed: ${dividend} % ${divisor} = ${result}`,
    );
  }
}

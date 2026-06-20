import type { IModuloArithmeticCommand } from "../contracts/IModuloArithmeticCommand.js";
import type { IModuloArithmeticCommandInvoker, InvocationRecord } from "../contracts/IModuloArithmeticCommandInvoker.js";

export abstract class AbstractBaseModuloArithmeticCommandInvoker implements IModuloArithmeticCommandInvoker {
  protected readonly invocationHistory: InvocationRecord[] = [];
  private invocationCounter: number = 0;

  abstract getInvokerName(): string;
  abstract getInvokerVersion(): string;

  invoke(command: IModuloArithmeticCommand, dividend: number, divisor: number): number {
    this.preInvoke(command, dividend, divisor);
    const result = command.execute(dividend, divisor);
    this.postInvoke(command, dividend, divisor, result);
    this.recordInvocation(command, dividend, divisor, result);
    return result;
  }

  getInvocationHistory(): readonly InvocationRecord[] {
    return [...this.invocationHistory];
  }

  clearHistory(): void {
    this.invocationHistory.length = 0;
  }

  protected preInvoke(
    _command: IModuloArithmeticCommand,
    _dividend: number,
    _divisor: number,
  ): void {
  }

  protected postInvoke(
    _command: IModuloArithmeticCommand,
    _dividend: number,
    _divisor: number,
    _result: number,
  ): void {
  }

  private recordInvocation(
    command: IModuloArithmeticCommand,
    dividend: number,
    divisor: number,
    result: number,
  ): void {
    this.invocationCounter++;
    this.invocationHistory.push({
      commandName: command.getCommandName(),
      dividend,
      divisor,
      result,
      timestamp: Date.now(),
      invocationId: `INV-${this.invocationCounter}-${Date.now()}`,
    });
  }
}

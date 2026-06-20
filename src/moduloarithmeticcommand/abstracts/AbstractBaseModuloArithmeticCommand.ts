import type { IModuloArithmeticCommand } from "../contracts/IModuloArithmeticCommand.js";

export abstract class AbstractBaseModuloArithmeticCommand implements IModuloArithmeticCommand {
  abstract execute(dividend: number, divisor: number): number;
  abstract getCommandName(): string;
  abstract getCommandVersion(): string;

  supportsOperands(_dividend: number, divisor: number): boolean {
    return Number.isFinite(divisor) && divisor !== 0;
  }

  getCommandDescriptor(): string {
    return `${this.getCommandName()} v${this.getCommandVersion()}`;
  }

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(`[${this.getCommandName()}] Dividend must be finite, received: ${dividend}`);
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(`[${this.getCommandName()}] Divisor must be finite, received: ${divisor}`);
    }
    if (divisor === 0) {
      throw new Error(`[${this.getCommandName()}] Division by zero is not permitted`);
    }
  }
}

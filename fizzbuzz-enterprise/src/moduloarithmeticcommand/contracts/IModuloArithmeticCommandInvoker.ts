import type { IModuloArithmeticCommand } from "./IModuloArithmeticCommand.js";

export interface IModuloArithmeticCommandInvoker {
  invoke(command: IModuloArithmeticCommand, dividend: number, divisor: number): number;
  getInvocationHistory(): readonly InvocationRecord[];
  getInvokerName(): string;
  getInvokerVersion(): string;
  clearHistory(): void;
}

export interface InvocationRecord {
  commandName: string;
  dividend: number;
  divisor: number;
  result: number;
  timestamp: number;
  invocationId: string;
}

import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";

export interface IFizzBuzzComputationCommandInvoker {
  getInvokerName(): string;
  getInvokerVersion(): string;
  invoke(command: IFizzBuzzComputationCommand<unknown>): unknown;
  invokeValue(command: IFizzBuzzComputationCommand<number>): string;
  invokeRange(command: IFizzBuzzComputationCommand<[number, number]>): readonly string[];
  isInvocationAuditEnabled(): boolean;
  getRegisteredCommandTypeNames(): readonly string[];
  registerCommandType(typeName: string): void;
}

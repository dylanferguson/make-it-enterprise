import type { IEnterpriseDivisibilityOrchestrationCommand } from "./IEnterpriseDivisibilityOrchestrationCommand.js";

export interface IEnterpriseDivisibilityOrchestrationInvoker {
  getInvokerName(): string;
  getInvokerVersion(): string;
  setCommand(command: IEnterpriseDivisibilityOrchestrationCommand): void;
  getCommand(): IEnterpriseDivisibilityOrchestrationCommand | null;
  invoke(value: number): string;
}

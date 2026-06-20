import type { IEnterpriseDivisibilityOrchestrationInvoker } from "../contracts/IEnterpriseDivisibilityOrchestrationInvoker.js";
import type { IEnterpriseDivisibilityOrchestrationCommand } from "../contracts/IEnterpriseDivisibilityOrchestrationCommand.js";

export abstract class AbstractBaseEnterpriseDivisibilityOrchestrationInvoker
  implements IEnterpriseDivisibilityOrchestrationInvoker
{
  private readonly invokerName: string;
  private readonly invokerVersion: string;
  private command: IEnterpriseDivisibilityOrchestrationCommand | null = null;

  constructor(invokerName: string, invokerVersion: string) {
    this.invokerName = invokerName;
    this.invokerVersion = invokerVersion;
  }

  getInvokerName(): string {
    return this.invokerName;
  }

  getInvokerVersion(): string {
    return this.invokerVersion;
  }

  setCommand(command: IEnterpriseDivisibilityOrchestrationCommand): void {
    this.command = command;
  }

  getCommand(): IEnterpriseDivisibilityOrchestrationCommand | null {
    return this.command;
  }

  abstract invoke(value: number): string;

  protected checkCommand(): IEnterpriseDivisibilityOrchestrationCommand {
    if (this.command === null) {
      throw new Error(
        `[${this.invokerName}] No command registered with invoker. ` +
        `Invoke setCommand() before invoke().`,
      );
    }
    return this.command;
  }
}

import type { IModuloRemainderComputationCommand, IModuloRemainderComputationCommandInvoker } from "../contracts/index.js";

export abstract class AbstractBaseModuloRemainderComputationCommandInvoker
  implements IModuloRemainderComputationCommandInvoker
{
  protected static readonly INVOKER_FRAMEWORK_VERSION = "1.0.0-MRC-INVOKER-FRAMEWORK";

  protected readonly invokerName: string;
  protected readonly invokerVersion: string;
  protected readonly registeredCommands: Map<string, IModuloRemainderComputationCommand>;

  constructor(invokerName: string, invokerVersion: string) {
    this.invokerName = invokerName;
    this.invokerVersion = invokerVersion;
    this.registeredCommands = new Map<string, IModuloRemainderComputationCommand>();
  }

  abstract invokeComputation(value: number, divisor: number): number;

  getInvokerName(): string {
    return this.invokerName;
  }

  getInvokerVersion(): string {
    return this.invokerVersion;
  }

  registerCommand(command: IModuloRemainderComputationCommand): void {
    this.registeredCommands.set(command.getCommandName(), command);
  }

  getRegisteredCommandNames(): readonly string[] {
    return Array.from(this.registeredCommands.keys());
  }
}

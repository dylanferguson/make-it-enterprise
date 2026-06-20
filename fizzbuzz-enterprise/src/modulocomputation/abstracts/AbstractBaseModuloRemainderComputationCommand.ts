import type { IModuloRemainderComputationCommand } from "../contracts/index.js";

export abstract class AbstractBaseModuloRemainderComputationCommand
  implements IModuloRemainderComputationCommand
{
  protected static readonly DEFAULT_DIVIDEND_VALIDATION_ENABLED = true;
  protected static readonly FRAMEWORK_VERSION = "1.0.0-MRC-FRAMEWORK";

  protected readonly commandName: string;
  protected readonly commandVersion: string;

  constructor(commandName: string, commandVersion: string) {
    this.commandName = commandName;
    this.commandVersion = commandVersion;
  }

  abstract executeComputation(value: number, divisor: number): number;

  getCommandName(): string {
    return this.commandName;
  }

  getCommandVersion(): string {
    return this.commandVersion;
  }

  getCommandDescriptor(): string {
    return `${this.commandName}::v${this.commandVersion}`;
  }
}

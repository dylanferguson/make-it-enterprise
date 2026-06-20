import type { IEnterpriseComputedOutcomePreEvaluationCommand } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseComputedOutcomePreEvaluationCommand
  implements IEnterpriseComputedOutcomePreEvaluationCommand
{
  private static readonly COMMAND_FRAMEWORK_VERSION = "1.0.0-PRE-EVALUATION-COMMAND-FRAMEWORK";
  private static readonly DEFAULT_FALLBACK_FLAG = false;

  protected readonly commandName: string;
  protected readonly commandVersion: string;
  protected readonly commandPriority: number;
  protected readonly supportedDivisor: number | null;
  protected readonly outputMessage: string | null;
  protected readonly isFallback: boolean;

  constructor(
    commandName: string,
    commandVersion: string,
    commandPriority: number,
    supportedDivisor: number | null,
    outputMessage: string | null,
    isFallback: boolean = false,
  ) {
    this.commandName = commandName;
    this.commandVersion = commandVersion;
    this.commandPriority = commandPriority;
    this.supportedDivisor = supportedDivisor;
    this.outputMessage = outputMessage;
    this.isFallback = isFallback;
  }

  abstract getCommandName(): string;
  abstract getCommandVersion(): string;

  getCommandPriority(): number {
    return this.commandPriority;
  }

  getSupportedDivisor(): number | null {
    return this.supportedDivisor;
  }

  getOutputMessage(): string | null {
    return this.outputMessage;
  }

  isFallbackCommand(): boolean {
    return this.isFallback;
  }

  abstract evaluate(value: number): string | null;

  protected getCommandFrameworkVersion(): string {
    return AbstractBaseEnterpriseComputedOutcomePreEvaluationCommand.COMMAND_FRAMEWORK_VERSION;
  }

  protected validateCommandValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.commandName} v${this.commandVersion}] Invalid command evaluation value: ${value}`,
      );
    }
  }

  protected evaluateDivisibility(value: number, divisor: number): boolean {
    return value % divisor === 0;
  }
}

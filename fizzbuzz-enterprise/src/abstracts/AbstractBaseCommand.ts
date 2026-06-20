import type { ICommand } from "../contracts/ICommand.js";

export abstract class AbstractBaseCommand<TInput, TOutput> implements ICommand<TInput, TOutput> {
  abstract execute(input: TInput): TOutput;
  abstract getCommandName(): string;
  abstract canExecute(input: TInput): boolean;

  protected logExecution(input: TInput): void {
    console.debug(`[Command:${this.getCommandName()}] Executing with input:`, input);
  }

  protected createExecutionError(input: TInput, reason: string): Error {
    return new Error(
      `Command '${this.getCommandName()}' failed for input ${String(input)}: ${reason}`,
    );
  }
}

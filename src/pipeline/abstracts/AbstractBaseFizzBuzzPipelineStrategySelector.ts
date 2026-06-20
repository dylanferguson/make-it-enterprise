import type { IFizzBuzzPipelineStrategySelector } from "../contracts/IFizzBuzzPipelineStrategySelector.js";
import type { IFizzBuzzPipelineExecutionCommand } from "../contracts/IFizzBuzzPipelineExecutionCommand.js";

export abstract class AbstractBaseFizzBuzzPipelineStrategySelector implements IFizzBuzzPipelineStrategySelector {
  protected readonly registeredCommands: Map<string, IFizzBuzzPipelineExecutionCommand> = new Map();

  abstract selectSingleValueStrategy(value: number): IFizzBuzzPipelineExecutionCommand;
  abstract selectRangeStrategy(start: number, end: number): IFizzBuzzPipelineExecutionCommand;
  abstract getStrategySelectorName(): string;
  abstract getStrategySelectorVersion(): string;

  registerStrategyCommand(name: string, command: IFizzBuzzPipelineExecutionCommand): void {
    this.registeredCommands.set(name, command);
  }

  getRegisteredStrategyNames(): readonly string[] {
    return Array.from(this.registeredCommands.keys());
  }

  getRegisteredCommandCount(): number {
    return this.registeredCommands.size;
  }
}

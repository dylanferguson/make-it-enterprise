import type { IFizzBuzzPipelineExecutionCommand } from "../contracts/IFizzBuzzPipelineExecutionCommand.js";

export abstract class AbstractBaseFizzBuzzPipelineExecutionCommand implements IFizzBuzzPipelineExecutionCommand {
  abstract executeSingleValue(value: number): string;
  abstract executeRange(start: number, end: number): readonly string[];
  abstract getCommandDescriptor(): string;
  abstract getCommandGroup(): string;

  canExecute(_value: number): boolean {
    return true;
  }
}

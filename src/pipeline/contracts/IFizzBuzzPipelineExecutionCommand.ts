export interface IFizzBuzzPipelineExecutionCommand {
  executeSingleValue(value: number): string;
  executeRange(start: number, end: number): readonly string[];
  getCommandDescriptor(): string;
  getCommandGroup(): string;
  canExecute(value: number): boolean;
}

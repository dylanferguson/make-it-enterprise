import type { IFizzBuzzPipelineExecutionCommand } from "./IFizzBuzzPipelineExecutionCommand.js";

export interface IFizzBuzzPipelineStrategySelector {
  selectSingleValueStrategy(value: number): IFizzBuzzPipelineExecutionCommand;
  selectRangeStrategy(start: number, end: number): IFizzBuzzPipelineExecutionCommand;
  getStrategySelectorName(): string;
  getStrategySelectorVersion(): string;
  getRegisteredStrategyNames(): readonly string[];
}

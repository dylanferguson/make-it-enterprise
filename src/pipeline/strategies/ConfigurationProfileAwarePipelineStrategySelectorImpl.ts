import type { IFizzBuzzPipelineExecutionCommand } from "../contracts/IFizzBuzzPipelineExecutionCommand.js";
import { AbstractBaseFizzBuzzPipelineStrategySelector } from "../abstracts/AbstractBaseFizzBuzzPipelineStrategySelector.js";

export class ConfigurationProfileAwarePipelineStrategySelectorImpl
  extends AbstractBaseFizzBuzzPipelineStrategySelector
{
  private static readonly STRATEGY_SELECTOR_NAME = "ConfigurationProfileAwarePipelineStrategySelector";
  private static readonly STRATEGY_SELECTOR_VERSION = "1.0.0-PIPELINE-STRATEGY-SELECTOR";
  private readonly defaultCommand: IFizzBuzzPipelineExecutionCommand;

  constructor(defaultCommand: IFizzBuzzPipelineExecutionCommand) {
    super();
    this.defaultCommand = defaultCommand;
    this.registerStrategyCommand("DEFAULT", defaultCommand);
  }

  override selectSingleValueStrategy(_value: number): IFizzBuzzPipelineExecutionCommand {
    return this.defaultCommand;
  }

  override selectRangeStrategy(_start: number, _end: number): IFizzBuzzPipelineExecutionCommand {
    return this.defaultCommand;
  }

  override getStrategySelectorName(): string {
    return ConfigurationProfileAwarePipelineStrategySelectorImpl.STRATEGY_SELECTOR_NAME;
  }

  override getStrategySelectorVersion(): string {
    return ConfigurationProfileAwarePipelineStrategySelectorImpl.STRATEGY_SELECTOR_VERSION;
  }
}

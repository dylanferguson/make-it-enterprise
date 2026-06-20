import type { IFizzBuzzPipelineManager } from "../contracts/IFizzBuzzPipelineManager.js";
import type { IFizzBuzzPipelineConfigurationProfile } from "../contracts/IFizzBuzzPipelineConfigurationProfile.js";
import type { IFizzBuzzPipelineStrategySelector } from "../contracts/IFizzBuzzPipelineStrategySelector.js";
import type { IFizzBuzzPipelineExecutionCommand } from "../contracts/IFizzBuzzPipelineExecutionCommand.js";
import { AbstractBaseFizzBuzzPipelineManager } from "../abstracts/AbstractBaseFizzBuzzPipelineManager.js";

export class DefaultFizzBuzzPipelineManagerImpl extends AbstractBaseFizzBuzzPipelineManager {
  private static readonly MANAGER_NAME = "DefaultFizzBuzzPipelineManager";
  private static readonly MANAGER_VERSION = "1.0.0-PIPELINE-MANAGER";

  private readonly strategySelector: IFizzBuzzPipelineStrategySelector;
  private readonly configurationProfile: IFizzBuzzPipelineConfigurationProfile;

  constructor(
    strategySelector: IFizzBuzzPipelineStrategySelector,
    configurationProfile: IFizzBuzzPipelineConfigurationProfile,
  ) {
    super();
    this.strategySelector = strategySelector;
    this.configurationProfile = configurationProfile;
    this.markPipelineInitialized();
  }

  override executeSingleValuePipeline(value: number): string {
    const command = this.strategySelector.selectSingleValueStrategy(value);
    return command.executeSingleValue(value);
  }

  override executeRangePipeline(start: number, end: number): readonly string[] {
    const command = this.strategySelector.selectRangeStrategy(start, end);
    return command.executeRange(start, end);
  }

  override getManagerName(): string {
    return DefaultFizzBuzzPipelineManagerImpl.MANAGER_NAME;
  }

  override getManagerVersion(): string {
    return DefaultFizzBuzzPipelineManagerImpl.MANAGER_VERSION;
  }

  override getActiveConfigurationProfile(): IFizzBuzzPipelineConfigurationProfile {
    return this.configurationProfile;
  }

  getStrategySelector(): IFizzBuzzPipelineStrategySelector {
    return this.strategySelector;
  }
}

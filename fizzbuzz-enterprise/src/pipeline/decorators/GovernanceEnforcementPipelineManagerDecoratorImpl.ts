import type { IFizzBuzzPipelineManager } from "../contracts/IFizzBuzzPipelineManager.js";
import type { IFizzBuzzPipelineConfigurationProfile } from "../contracts/IFizzBuzzPipelineConfigurationProfile.js";
import { AbstractBaseFizzBuzzPipelineManager } from "../abstracts/AbstractBaseFizzBuzzPipelineManager.js";

export class GovernanceEnforcementPipelineManagerDecoratorImpl
  extends AbstractBaseFizzBuzzPipelineManager
{
  private static readonly DECORATOR_NAME = "GovernanceEnforcementPipelineManagerDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-PIPELINE-GOVERNANCE-DECORATOR";

  private readonly wrappedManager: IFizzBuzzPipelineManager;

  constructor(wrappedManager: IFizzBuzzPipelineManager) {
    super();
    this.wrappedManager = wrappedManager;
    this.pipelineInitialized = wrappedManager.isPipelineInitialized();
  }

  override executeSingleValuePipeline(value: number): string {
    this.notifyPreSingleValueResolution(value);
    const result = this.wrappedManager.executeSingleValuePipeline(value);
    this.notifyPostSingleValueResolution(value, result);
    return result;
  }

  override executeRangePipeline(start: number, end: number): readonly string[] {
    this.notifyPreRangeResolution(start, end);
    const results = this.wrappedManager.executeRangePipeline(start, end);
    this.notifyPostRangeResolution(start, end, results);
    return results;
  }

  override getManagerName(): string {
    return GovernanceEnforcementPipelineManagerDecoratorImpl.DECORATOR_NAME;
  }

  override getManagerVersion(): string {
    return GovernanceEnforcementPipelineManagerDecoratorImpl.DECORATOR_VERSION;
  }

  override getActiveConfigurationProfile(): IFizzBuzzPipelineConfigurationProfile {
    return this.wrappedManager.getActiveConfigurationProfile();
  }

  getWrappedManager(): IFizzBuzzPipelineManager {
    return this.wrappedManager;
  }
}

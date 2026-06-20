import type { IFizzBuzzPipelineManager } from "../../pipeline/contracts/IFizzBuzzPipelineManager.js";
import type { IPipelineManagerResolutionConfigurationProfile } from "../contracts/IPipelineManagerResolutionConfigurationProfile.js";
import { AbstractBasePipelineManagerResolutionStrategy } from "../abstracts/AbstractBasePipelineManagerResolutionStrategy.js";

export class DirectPipelineManagerResolutionStrategyImpl
  extends AbstractBasePipelineManagerResolutionStrategy
{
  protected readonly strategyName = "DirectPipelineManagerResolutionStrategy";
  protected readonly strategyVersion = "1.0.0-DIRECT-RESOLUTION";
  protected readonly configurationProfile: IPipelineManagerResolutionConfigurationProfile;

  private readonly managerResolver: () => IFizzBuzzPipelineManager;

  constructor(
    configurationProfile: IPipelineManagerResolutionConfigurationProfile,
    managerResolver: () => IFizzBuzzPipelineManager,
  ) {
    super();
    this.configurationProfile = configurationProfile;
    this.managerResolver = managerResolver;
  }

  override resolvePipelineManager(): IFizzBuzzPipelineManager {
    return this.managerResolver();
  }

  override canResolve(): boolean {
    return true;
  }
}

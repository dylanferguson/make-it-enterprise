import type { IFizzBuzzPipelineManager } from "../../pipeline/contracts/IFizzBuzzPipelineManager.js";
import type { IPipelineManagerResolutionConfigurationProfile } from "../contracts/IPipelineManagerResolutionConfigurationProfile.js";
import type { IServiceLocator } from "../../contracts/IServiceLocator.js";
import { AbstractBasePipelineManagerResolutionStrategy } from "../abstracts/AbstractBasePipelineManagerResolutionStrategy.js";

export class ServiceLocatorManagedPipelineManagerResolutionStrategyImpl
  extends AbstractBasePipelineManagerResolutionStrategy
{
  protected readonly strategyName = "ServiceLocatorManagedPipelineManagerResolutionStrategy";
  protected readonly strategyVersion = "1.0.0-SL-RESOLUTION";
  protected readonly configurationProfile: IPipelineManagerResolutionConfigurationProfile;

  private readonly serviceLocator: IServiceLocator;
  private readonly serviceLocatorLookupKey: string;

  constructor(
    configurationProfile: IPipelineManagerResolutionConfigurationProfile,
    serviceLocator: IServiceLocator,
    lookupKey: string = "FizzBuzzPipelineManager",
  ) {
    super();
    this.configurationProfile = configurationProfile;
    this.serviceLocator = serviceLocator;
    this.serviceLocatorLookupKey = lookupKey;
  }

  override resolvePipelineManager(): IFizzBuzzPipelineManager {
    return this.serviceLocator.getValueResolver() as unknown as IFizzBuzzPipelineManager;
  }

  override canResolve(): boolean {
    return this.configurationProfile.isServiceLocatorLookupEnabled() && this.serviceLocator !== null;
  }
}

import type { IFizzBuzzPipelineManager } from "../../pipeline/contracts/IFizzBuzzPipelineManager.js";
import type { IPipelineManagerResolutionConfigurationProfile } from "./IPipelineManagerResolutionConfigurationProfile.js";

export interface IPipelineManagerResolutionStrategy {
  resolvePipelineManager(): IFizzBuzzPipelineManager;
  getStrategyName(): string;
  getStrategyVersion(): string;
  getConfigurationProfile(): IPipelineManagerResolutionConfigurationProfile;
  canResolve(): boolean;
}

import type { IFizzBuzzPipelineResultVisitor } from "./IFizzBuzzPipelineResultVisitor.js";
import type { IFizzBuzzPipelineConfigurationProfile } from "./IFizzBuzzPipelineConfigurationProfile.js";

export interface IFizzBuzzPipelineManager {
  executeSingleValuePipeline(value: number): string;
  executeRangePipeline(start: number, end: number): readonly string[];
  getManagerName(): string;
  getManagerVersion(): string;
  getActiveConfigurationProfile(): IFizzBuzzPipelineConfigurationProfile;
  registerPipelineVisitor(visitor: IFizzBuzzPipelineResultVisitor): void;
  getRegisteredPipelineVisitorNames(): readonly string[];
  isPipelineInitialized(): boolean;
}

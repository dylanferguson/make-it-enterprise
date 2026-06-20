import type { IFizzBuzzPipelineManager } from "../contracts/IFizzBuzzPipelineManager.js";
import type { IFizzBuzzPipelineResultVisitor } from "../contracts/IFizzBuzzPipelineResultVisitor.js";
import type { IFizzBuzzPipelineConfigurationProfile } from "../contracts/IFizzBuzzPipelineConfigurationProfile.js";

export abstract class AbstractBaseFizzBuzzPipelineManager implements IFizzBuzzPipelineManager {
  protected readonly visitors: IFizzBuzzPipelineResultVisitor[] = [];
  protected pipelineInitialized = false;

  abstract executeSingleValuePipeline(value: number): string;
  abstract executeRangePipeline(start: number, end: number): readonly string[];
  abstract getManagerName(): string;
  abstract getManagerVersion(): string;
  abstract getActiveConfigurationProfile(): IFizzBuzzPipelineConfigurationProfile;

  registerPipelineVisitor(visitor: IFizzBuzzPipelineResultVisitor): void {
    this.visitors.push(visitor);
  }

  getRegisteredPipelineVisitorNames(): readonly string[] {
    return this.visitors.map((v) => v.getVisitorName());
  }

  isPipelineInitialized(): boolean {
    return this.pipelineInitialized;
  }

  protected markPipelineInitialized(): void {
    this.pipelineInitialized = true;
  }

  protected notifyPreSingleValueResolution(value: number): void {
    for (const visitor of this.visitors) {
      visitor.visitPreSingleValueResolution(value, this.getManagerName());
    }
  }

  protected notifyPostSingleValueResolution(value: number, result: string): void {
    for (const visitor of this.visitors) {
      visitor.visitPostSingleValueResolution(value, result, this.getManagerName());
    }
  }

  protected notifyPreRangeResolution(start: number, end: number): void {
    for (const visitor of this.visitors) {
      visitor.visitPreRangeResolution(start, end, this.getManagerName());
    }
  }

  protected notifyPostRangeResolution(start: number, end: number, results: readonly string[]): void {
    for (const visitor of this.visitors) {
      visitor.visitPostRangeResolution(start, end, results, this.getManagerName());
    }
  }
}

import type { IEnterpriseFizzBuzzNormalizationContext } from "../contracts/IEnterpriseFizzBuzzNormalizationContext.js";

export abstract class AbstractBaseEnterpriseFizzBuzzNormalizationContext
  implements IEnterpriseFizzBuzzNormalizationContext
{
  private readonly originalResult: string;
  private normalizedResult: string;
  private readonly stageNames: string[] = [];
  private readonly computationValue: number;
  private readonly computationContextId: string;

  constructor(originalResult: string, computationValue: number, computationContextId: string) {
    this.originalResult = originalResult;
    this.normalizedResult = originalResult;
    this.computationValue = computationValue;
    this.computationContextId = computationContextId;
  }

  getOriginalResult(): string {
    return this.originalResult;
  }

  getNormalizedResult(): string {
    return this.normalizedResult;
  }

  setNormalizedResult(result: string): void {
    this.normalizedResult = result;
  }

  getNormalizationStageNames(): readonly string[] {
    return [...this.stageNames];
  }

  recordStageVisit(stageName: string): void {
    this.stageNames.push(stageName);
  }

  getComputationValue(): number {
    return this.computationValue;
  }

  getComputationContextId(): string {
    return this.computationContextId;
  }

  abstract clone(): IEnterpriseFizzBuzzNormalizationContext;
}

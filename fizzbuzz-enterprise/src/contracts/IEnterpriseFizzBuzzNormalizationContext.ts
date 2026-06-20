export interface IEnterpriseFizzBuzzNormalizationContext {
  getOriginalResult(): string;
  getNormalizedResult(): string;
  setNormalizedResult(result: string): void;
  getNormalizationStageNames(): readonly string[];
  recordStageVisit(stageName: string): void;
  getComputationValue(): number;
  getComputationContextId(): string;
  clone(): IEnterpriseFizzBuzzNormalizationContext;
}

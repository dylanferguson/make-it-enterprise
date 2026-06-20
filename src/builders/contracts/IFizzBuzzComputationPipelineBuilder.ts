import type { IFizzBuzzRangeIterator } from "../../iterators/contracts/IFizzBuzzRangeIterator.js";

export interface IFizzBuzzComputationPipelineBuilder {
  getBuilderName(): string;
  getBuilderVersion(): string;
  withRangeIterator(iterator: IFizzBuzzRangeIterator): IFizzBuzzComputationPipelineBuilder;
  withGovernanceEnforcement(governanceEnforcer: (value: number, inner: (v: number) => string) => string): IFizzBuzzComputationPipelineBuilder;
  withMediationOrchestrator(orchestrator: {
    orchestrateDirectiveResolution: (value: number, inner: (v: number) => string) => string;
    orchestrateRangeDirectiveResolution: (start: number, end: number, inner: (v: number) => string) => readonly string[];
  }): IFizzBuzzComputationPipelineBuilder;
  withResolutionFacade(facade: { resolveValue: (value: number) => string }): IFizzBuzzComputationPipelineBuilder;
  withConfigurationProfile(profile: string): IFizzBuzzComputationPipelineBuilder;
  withSlaThreshold(thresholdMs: number): IFizzBuzzComputationPipelineBuilder;
  withCacheEnabled(enabled: boolean): IFizzBuzzComputationPipelineBuilder;
  build(): IFizzBuzzComputationPipelineProduct;
}

export interface IFizzBuzzComputationPipelineProduct {
  getProductName(): string;
  getProductVersion(): string;
  getPipelineConfigurationProfile(): string;
  resolveSingleValue(value: number): string;
  resolveRange(start: number, end: number): readonly string[];
  getUnderlyingIterator(): IFizzBuzzRangeIterator | null;
  getDiagnosticSummary(): Record<string, string>;
}

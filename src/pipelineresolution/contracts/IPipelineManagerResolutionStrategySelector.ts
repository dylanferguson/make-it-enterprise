import type { IPipelineManagerResolutionStrategy } from "./IPipelineManagerResolutionStrategy.js";

export interface IPipelineManagerResolutionStrategySelector {
  selectPipelineManagerResolutionStrategy(): IPipelineManagerResolutionStrategy;
  getSelectorName(): string;
  getSelectorVersion(): string;
  getRegisteredStrategyNames(): readonly string[];
  registerResolutionStrategy(
    strategyName: string,
    strategy: IPipelineManagerResolutionStrategy,
  ): void;
}

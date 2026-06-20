import type { IEnterpriseFizzBuzzResolutionDirective } from "./IEnterpriseFizzBuzzResolutionDirective.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "./IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";

export interface IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator {
  orchestrateDirectiveResolution(
    value: number,
    innerResolver: (value: number) => string,
  ): string;
  orchestrateRangeDirectiveResolution(
    start: number,
    end: number,
    innerResolver: (value: number) => string,
  ): readonly string[];
  registerMediationStrategy(
    name: string,
    strategy: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy,
  ): void;
  getRegisteredMediationStrategyNames(): readonly string[];
  getActiveMediationStrategyName(): string;
  setActiveMediationStrategyName(name: string): void;
  getMediationOrchestratorName(): string;
  getMediationOrchestratorVersion(): string;
}

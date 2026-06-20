import type { IComputationOutcomeLifecycleVisitor } from "./IComputationOutcomeLifecycleVisitor.js";
import type { IComputationOutcomeLifecycleSpecificationValidator } from "./IComputationOutcomeLifecycleSpecificationValidator.js";
import type { IComputationOutcomeLifecycleChainHandler } from "./IComputationOutcomeLifecycleChainHandler.js";
import type { IEnterpriseComputationOutcomeLifecycleState } from "./IEnterpriseComputationOutcomeLifecycleState.js";

export interface IEnterpriseComputationResolutionLifecycleOrchestrator {
  getOrchestratorName(): string;
  getOrchestratorVersion(): string;
  getOrchestratorDescriptor(): string;
  registerLifecycleVisitor(visitor: IComputationOutcomeLifecycleVisitor): void;
  registerLifecycleValidator(validator: IComputationOutcomeLifecycleSpecificationValidator): void;
  registerLifecycleChainHandler(handler: IComputationOutcomeLifecycleChainHandler): void;
  getRegisteredVisitors(): readonly IComputationOutcomeLifecycleVisitor[];
  getRegisteredValidators(): readonly IComputationOutcomeLifecycleSpecificationValidator[];
  getChainHead(): IComputationOutcomeLifecycleChainHandler | null;
  orchestrateSingleValueResolution(
    value: number,
    innerResolver: (v: number) => string,
  ): string;
  orchestrateRangeResolution(
    start: number,
    end: number,
    innerResolver: (v: number) => string,
  ): readonly string[];
  getCurrentState(): IEnterpriseComputationOutcomeLifecycleState;
  getStateTransitionHistory(): readonly string[];
}

import type { IResolutionDelegationVisitor } from "../visitors/contracts/IResolutionDelegationVisitor.js";

export interface IEnterpriseFizzBuzzResolutionDelegationOrchestrator {
  orchestrateDelegation(
    value: number,
    innerResolver: (value: number) => string,
  ): string;

  orchestrateRangeDelegation(
    start: number,
    end: number,
    rangeResolver: (start: number, end: number) => readonly string[],
  ): readonly string[];

  registerVisitor(visitor: IResolutionDelegationVisitor): void;
  getRegisteredVisitorNames(): readonly string[];
  getOrchestratorName(): string;
  getOrchestratorVersion(): string;
  getOrchestratorDescriptor(): string;
  isOrchestratorInitialized(): boolean;
}

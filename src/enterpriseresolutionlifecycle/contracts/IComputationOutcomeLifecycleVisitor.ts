import type { IEnterpriseComputationOutcomeLifecycleState } from "./IEnterpriseComputationOutcomeLifecycleState.js";

export interface IComputationOutcomeLifecycleVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  getVisitorDescriptor(): string;
  onLifecycleStateTransition(
    previousState: IEnterpriseComputationOutcomeLifecycleState | null,
    currentState: IEnterpriseComputationOutcomeLifecycleState,
    value: number,
    intermediateResult: string | null,
  ): void;
  onLifecycleValidation(
    value: number,
    computedResult: string,
    validationOutcome: string,
    validatorName: string,
  ): void;
  onLifecycleFormatting(
    value: number,
    rawResult: string,
    formattedResult: string,
    formatterName: string,
  ): void;
  getVisitationLog(): readonly string[];
  getVisitationCount(): number;
}

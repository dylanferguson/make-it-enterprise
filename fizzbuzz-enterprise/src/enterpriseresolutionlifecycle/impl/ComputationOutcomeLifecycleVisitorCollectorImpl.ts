import type { IComputationOutcomeLifecycleVisitor } from "../contracts/IComputationOutcomeLifecycleVisitor.js";
import type { IEnterpriseComputationOutcomeLifecycleState } from "../contracts/IEnterpriseComputationOutcomeLifecycleState.js";

export class ComputationOutcomeLifecycleVisitorCollectorImpl
  implements IComputationOutcomeLifecycleVisitor
{
  private readonly _visitorName: string;
  private readonly _visitorVersion: string;
  private readonly _visitorDescriptor: string;
  private readonly _visitationLog: string[] = [];

  constructor(
    visitorName: string,
    visitorVersion: string,
    visitorDescriptor: string,
  ) {
    this._visitorName = visitorName;
    this._visitorVersion = visitorVersion;
    this._visitorDescriptor = visitorDescriptor;
  }

  getVisitorName(): string {
    return this._visitorName;
  }

  getVisitorVersion(): string {
    return this._visitorVersion;
  }

  getVisitorDescriptor(): string {
    return this._visitorDescriptor;
  }

  onLifecycleStateTransition(
    previousState: IEnterpriseComputationOutcomeLifecycleState | null,
    currentState: IEnterpriseComputationOutcomeLifecycleState,
    value: number,
    intermediateResult: string | null,
  ): void {
    const entry =
      `STATE_TRANSITION:${previousState?.getStateCode() ?? "NONE"}->${currentState.getStateCode()}` +
      `|value=${value}|result=${intermediateResult ?? "null"}` +
      `|stateVersion=${currentState.getStateVersion()}`;
    this._visitationLog.push(entry);
  }

  onLifecycleValidation(
    value: number,
    computedResult: string,
    validationOutcome: string,
    validatorName: string,
  ): void {
    const entry =
      `VALIDATION:value=${value}|result=${computedResult}|outcome=${validationOutcome}|validator=${validatorName}`;
    this._visitationLog.push(entry);
  }

  onLifecycleFormatting(
    value: number,
    rawResult: string,
    formattedResult: string,
    formatterName: string,
  ): void {
    const entry =
      `FORMATTING:value=${value}|raw=${rawResult}|formatted=${formattedResult}|formatter=${formatterName}`;
    this._visitationLog.push(entry);
  }

  getVisitationLog(): readonly string[] {
    return [...this._visitationLog];
  }

  getVisitationCount(): number {
    return this._visitationLog.length;
  }
}

import type { IEnterpriseComputationResolutionLifecycleOrchestrator } from "../contracts/IEnterpriseComputationResolutionLifecycleOrchestrator.js";
import type { IComputationOutcomeLifecycleVisitor } from "../contracts/IComputationOutcomeLifecycleVisitor.js";
import type { IComputationOutcomeLifecycleSpecificationValidator } from "../contracts/IComputationOutcomeLifecycleSpecificationValidator.js";
import type { IComputationOutcomeLifecycleChainHandler } from "../contracts/IComputationOutcomeLifecycleChainHandler.js";
import type { IEnterpriseComputationOutcomeLifecycleState } from "../contracts/IEnterpriseComputationOutcomeLifecycleState.js";
import { InitializedComputationOutcomeLifecycleStateImpl } from "../impl/states/InitializedComputationOutcomeLifecycleStateImpl.js";
import { ComputingComputationOutcomeLifecycleStateImpl } from "../impl/states/ComputingComputationOutcomeLifecycleStateImpl.js";
import { ComputedComputationOutcomeLifecycleStateImpl } from "../impl/states/ComputedComputationOutcomeLifecycleStateImpl.js";
import { ValidatingComputationOutcomeLifecycleStateImpl } from "../impl/states/ValidatingComputationOutcomeLifecycleStateImpl.js";
import { ValidatedComputationOutcomeLifecycleStateImpl } from "../impl/states/ValidatedComputationOutcomeLifecycleStateImpl.js";
import { FormattingComputationOutcomeLifecycleStateImpl } from "../impl/states/FormattingComputationOutcomeLifecycleStateImpl.js";
import { FormattedComputationOutcomeLifecycleStateImpl } from "../impl/states/FormattedComputationOutcomeLifecycleStateImpl.js";

export abstract class AbstractBaseEnterpriseComputationResolutionLifecycleOrchestratorImpl
  implements IEnterpriseComputationResolutionLifecycleOrchestrator
{
  private readonly _orchestratorName: string;
  private readonly _orchestratorVersion: string;
  private readonly _visitors: IComputationOutcomeLifecycleVisitor[] = [];
  private readonly _validators: IComputationOutcomeLifecycleSpecificationValidator[] = [];
  private _chainHead: IComputationOutcomeLifecycleChainHandler | null = null;
  private _chainTail: IComputationOutcomeLifecycleChainHandler | null = null;
  private _currentState: IEnterpriseComputationOutcomeLifecycleState;
  private readonly _stateTransitionHistory: string[] = [];

  protected constructor(
    orchestratorName: string,
    orchestratorVersion: string,
  ) {
    this._orchestratorName = orchestratorName;
    this._orchestratorVersion = orchestratorVersion;
    this._currentState = new InitializedComputationOutcomeLifecycleStateImpl();
  }

  abstract getOrchestratorDescriptor(): string;

  getOrchestratorName(): string {
    return this._orchestratorName;
  }

  getOrchestratorVersion(): string {
    return this._orchestratorVersion;
  }

  registerLifecycleVisitor(visitor: IComputationOutcomeLifecycleVisitor): void {
    if (!this._visitors.some((v) => v.getVisitorName() === visitor.getVisitorName())) {
      this._visitors.push(visitor);
    }
  }

  registerLifecycleValidator(
    validator: IComputationOutcomeLifecycleSpecificationValidator,
  ): void {
    if (!this._validators.some((v) => v.getValidatorName() === validator.getValidatorName())) {
      this._validators.push(validator);
      this._validators.sort((a, b) => a.getValidationPriority() - b.getValidationPriority());
    }
  }

  registerLifecycleChainHandler(handler: IComputationOutcomeLifecycleChainHandler): void {
    if (this._chainHead === null) {
      this._chainHead = handler;
      this._chainTail = handler;
    } else if (this._chainTail !== null) {
      this._chainTail.setNextHandler(handler);
      this._chainTail = handler;
    }
  }

  getRegisteredVisitors(): readonly IComputationOutcomeLifecycleVisitor[] {
    return [...this._visitors];
  }

  getRegisteredValidators(): readonly IComputationOutcomeLifecycleSpecificationValidator[] {
    return [...this._validators];
  }

  getChainHead(): IComputationOutcomeLifecycleChainHandler | null {
    return this._chainHead;
  }

  getCurrentState(): IEnterpriseComputationOutcomeLifecycleState {
    return this._currentState;
  }

  getStateTransitionHistory(): readonly string[] {
    return [...this._stateTransitionHistory];
  }

  abstract orchestrateSingleValueResolution(
    value: number,
    innerResolver: (v: number) => string,
  ): string;

  abstract orchestrateRangeResolution(
    start: number,
    end: number,
    innerResolver: (v: number) => string,
  ): readonly string[];

  protected transitionToState(
    targetState: IEnterpriseComputationOutcomeLifecycleState,
  ): boolean {
    if (!this._currentState.canTransitionTo(targetState)) {
      return false;
    }
    const previousCode = this._currentState.getStateCode();
    this._currentState = targetState;
    this._stateTransitionHistory.push(
      `${previousStateCodeToName(previousCode)} -> ${targetState.getStateName()}@${targetState.getStateVersion()}`,
    );
    return true;
  }

  protected notifyVisitorsOnStateTransition(
    previousState: IEnterpriseComputationOutcomeLifecycleState | null,
    currentState: IEnterpriseComputationOutcomeLifecycleState,
    value: number,
    intermediateResult: string | null,
  ): void {
    for (const visitor of this._visitors) {
      visitor.onLifecycleStateTransition(previousState, currentState, value, intermediateResult);
    }
  }

  protected notifyVisitorsOnValidation(
    value: number,
    computedResult: string,
    validationOutcome: string,
    validatorName: string,
  ): void {
    for (const visitor of this._visitors) {
      visitor.onLifecycleValidation(value, computedResult, validationOutcome, validatorName);
    }
  }

  protected notifyVisitorsOnFormatting(
    value: number,
    rawResult: string,
    formattedResult: string,
    formatterName: string,
  ): void {
    for (const visitor of this._visitors) {
      visitor.onLifecycleFormatting(value, rawResult, formattedResult, formatterName);
    }
  }

  protected executeChainHandlers(
    eventType: string,
    value: number,
    currentResult: string | null,
  ): string | null {
    if (this._chainHead === null) {
      return currentResult;
    }
    return this._chainHead.handleLifecycleEvent(
      eventType,
      value,
      currentResult,
      this.createAggregateVisitor(),
    );
  }

  protected validateResult(
    value: number,
    computedResult: string,
  ): string {
    let validated = computedResult;
    for (const validator of this._validators) {
      if (!validator.isValidationEnabled()) continue;
      const result = validator.validateOutcome(value, validated);
      this.notifyVisitorsOnValidation(value, validated, result.validationMessage, validator.getValidatorName());
      if (!result.isValid) {
        validated = result.validationMessage;
      }
    }
    return validated;
  }

  protected createStateInstance(stateCode: string): IEnterpriseComputationOutcomeLifecycleState {
    switch (stateCode) {
      case "INITIALIZED": return new InitializedComputationOutcomeLifecycleStateImpl();
      case "COMPUTING": return new ComputingComputationOutcomeLifecycleStateImpl();
      case "COMPUTED": return new ComputedComputationOutcomeLifecycleStateImpl();
      case "VALIDATING": return new ValidatingComputationOutcomeLifecycleStateImpl();
      case "VALIDATED": return new ValidatedComputationOutcomeLifecycleStateImpl();
      case "FORMATTING": return new FormattingComputationOutcomeLifecycleStateImpl();
      case "FORMATTED": return new FormattedComputationOutcomeLifecycleStateImpl();
      default: return new InitializedComputationOutcomeLifecycleStateImpl();
    }
  }

  protected createAggregateVisitor(): IComputationOutcomeLifecycleVisitor {
    const visitors = this._visitors;
    return {
      getVisitorName: () => `AggregateVisitor[${visitors.length} registered]`,
      getVisitorVersion: () => "1.0.0-AGGREGATE-VISITOR",
      getVisitorDescriptor: () => `AggregateVisitor:${visitors.map((v) => v.getVisitorName()).join(",")}`,
      onLifecycleStateTransition: (
        prev, curr, val, res,
      ) => {
        for (const v of visitors) {
          v.onLifecycleStateTransition(prev, curr, val, res);
        }
      },
      onLifecycleValidation: (val, res, outcome, name) => {
        for (const v of visitors) {
          v.onLifecycleValidation(val, res, outcome, name);
        }
      },
      onLifecycleFormatting: (val, raw, fmt, name) => {
        for (const v of visitors) {
          v.onLifecycleFormatting(val, raw, fmt, name);
        }
      },
      getVisitationLog: () =>
        visitors.flatMap((v) => v.getVisitationLog()),
      getVisitationCount: () =>
        visitors.reduce((acc, v) => acc + v.getVisitationCount(), 0),
    };
  }
}

function previousStateCodeToName(code: string): string {
  const map: Record<string, string> = {
    INITIALIZED: "InitializedComputationOutcomeLifecycleStateImpl",
    COMPUTING: "ComputingComputationOutcomeLifecycleStateImpl",
    COMPUTED: "ComputedComputationOutcomeLifecycleStateImpl",
    VALIDATING: "ValidatingComputationOutcomeLifecycleStateImpl",
    VALIDATED: "ValidatedComputationOutcomeLifecycleStateImpl",
    FORMATTING: "FormattingComputationOutcomeLifecycleStateImpl",
    FORMATTED: "FormattedComputationOutcomeLifecycleStateImpl",
  };
  return map[code] ?? code;
}

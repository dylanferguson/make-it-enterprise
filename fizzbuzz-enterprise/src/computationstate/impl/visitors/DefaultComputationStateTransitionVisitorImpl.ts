import type { ComputationStateType } from "../../contracts/IComputationState.js";
import { AbstractBaseComputationStateTransitionVisitor } from "../../abstracts/AbstractBaseComputationStateTransitionVisitor.js";

export class DefaultComputationStateTransitionVisitorImpl extends AbstractBaseComputationStateTransitionVisitor {
  protected readonly visitorName = "DefaultComputationStateTransitionVisitor";
  protected readonly visitorVersion = "1.0.0-VISITOR-STATE-TRANSITION";

  visitPreTransition(fromState: ComputationStateType, toState: ComputationStateType): void {
    this.logEntry(`[StateTransitionVisitor] PRE_TRANSITION: from=[${fromState}] to=[${toState}]`);
  }

  visitPostTransition(
    fromState: ComputationStateType,
    toState: ComputationStateType,
    success: boolean,
    transitionCount: number,
  ): void {
    this.logEntry(
      `[StateTransitionVisitor] POST_TRANSITION: from=[${fromState}] to=[${toState}] ` +
      `success=[${success}] count=[${transitionCount}]`,
    );
  }

  visitStateEntry(state: ComputationStateType, value: number | null): void {
    this.logEntry(`[StateTransitionVisitor] STATE_ENTRY: state=[${state}] value=[${value}]`);
  }

  visitStateExit(state: ComputationStateType, result: string | null): void {
    this.logEntry(`[StateTransitionVisitor] STATE_EXIT: state=[${state}] result=[${result}]`);
  }

  visitError(state: ComputationStateType, errorMessage: string, transitionCount: number): void {
    this.logEntry(
      `[StateTransitionVisitor] STATE_ERROR: state=[${state}] error=[${errorMessage}] count=[${transitionCount}]`,
    );
  }
}

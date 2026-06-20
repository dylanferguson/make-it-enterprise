import { ComputationStateType } from "../../contracts/IComputationState.js";
import type { IComputationStateTransitionContext } from "../../contracts/IComputationState.js";
import { AbstractBaseComputationState } from "../../abstracts/AbstractBaseComputationState.js";

export class EvaluatingDivisibilityComputationStateImpl extends AbstractBaseComputationState {
  protected readonly stateName = "EvaluatingDivisibilityComputationState";
  protected readonly stateVersion = "1.0.0-STATE-EVALUATING-DIVISIBILITY";
  protected readonly stateDescriptor = "COMPUTATION_STATE_EVALUATING_DIVISIBILITY";
  protected readonly stateType = ComputationStateType.EVALUATING_DIVISIBILITY;
  protected readonly permittedTransitions: readonly ComputationStateType[] = [
    ComputationStateType.COMPOSING_OUTPUT,
    ComputationStateType.ERROR,
  ];

  onEntry(_context: IComputationStateTransitionContext): void {
  }

  onExit(context: IComputationStateTransitionContext): void {
    const error = context.getErrorMessage();
    if (error !== null) {
      context.setErrorMessage(`Divisibility evaluation error: ${error}`);
    }
  }
}

import { ComputationStateType } from "../../contracts/IComputationState.js";
import type { IComputationStateTransitionContext } from "../../contracts/IComputationState.js";
import { AbstractBaseComputationState } from "../../abstracts/AbstractBaseComputationState.js";

export class ValidatingComputationStateImpl extends AbstractBaseComputationState {
  protected readonly stateName = "ValidatingComputationState";
  protected readonly stateVersion = "1.0.0-STATE-VALIDATING";
  protected readonly stateDescriptor = "COMPUTATION_STATE_VALIDATING";
  protected readonly stateType = ComputationStateType.VALIDATING;
  protected readonly permittedTransitions: readonly ComputationStateType[] = [
    ComputationStateType.EVALUATING_DIVISIBILITY,
    ComputationStateType.ERROR,
  ];

  onEntry(context: IComputationStateTransitionContext): void {
    const value = context.getCurrentValue();
    if (value !== null && (!Number.isFinite(value) || !Number.isInteger(value))) {
      context.setErrorMessage(`Validation failed: value=[${value}] is not a valid integer`);
    }
  }

  onExit(_context: IComputationStateTransitionContext): void {
  }
}

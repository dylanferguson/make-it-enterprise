import { ComputationStateType } from "../../contracts/IComputationState.js";
import type { IComputationStateTransitionContext } from "../../contracts/IComputationState.js";
import { AbstractBaseComputationState } from "../../abstracts/AbstractBaseComputationState.js";

export class InitializedComputationStateImpl extends AbstractBaseComputationState {
  protected readonly stateName = "InitializedComputationState";
  protected readonly stateVersion = "1.0.0-STATE-INITIALIZED";
  protected readonly stateDescriptor = "COMPUTATION_STATE_INITIALIZED";
  protected readonly stateType = ComputationStateType.INITIALIZED;
  protected readonly permittedTransitions: readonly ComputationStateType[] = [
    ComputationStateType.VALIDATING,
    ComputationStateType.ERROR,
  ];

  onEntry(context: IComputationStateTransitionContext): void {
    context.setCurrentValue(null);
    context.setCurrentResult(null);
    context.setErrorMessage(null);
  }

  onExit(_context: IComputationStateTransitionContext): void {
  }
}

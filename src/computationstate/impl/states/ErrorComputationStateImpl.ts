import { ComputationStateType } from "../../contracts/IComputationState.js";
import type { IComputationStateTransitionContext } from "../../contracts/IComputationState.js";
import { AbstractBaseComputationState } from "../../abstracts/AbstractBaseComputationState.js";

export class ErrorComputationStateImpl extends AbstractBaseComputationState {
  protected readonly stateName = "ErrorComputationState";
  protected readonly stateVersion = "1.0.0-STATE-ERROR";
  protected readonly stateDescriptor = "COMPUTATION_STATE_ERROR";
  protected readonly stateType = ComputationStateType.ERROR;
  protected readonly permittedTransitions: readonly ComputationStateType[] = [
    ComputationStateType.INITIALIZED,
  ];

  onEntry(context: IComputationStateTransitionContext): void {
    const error = context.getErrorMessage();
    if (error === null) {
      context.setErrorMessage("Unknown error occurred during computation lifecycle");
    }
  }

  onExit(_context: IComputationStateTransitionContext): void {
  }
}

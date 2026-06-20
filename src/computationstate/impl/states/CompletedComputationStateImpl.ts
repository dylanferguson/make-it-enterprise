import { ComputationStateType } from "../../contracts/IComputationState.js";
import type { IComputationStateTransitionContext } from "../../contracts/IComputationState.js";
import { AbstractBaseComputationState } from "../../abstracts/AbstractBaseComputationState.js";

export class CompletedComputationStateImpl extends AbstractBaseComputationState {
  protected readonly stateName = "CompletedComputationState";
  protected readonly stateVersion = "1.0.0-STATE-COMPLETED";
  protected readonly stateDescriptor = "COMPUTATION_STATE_COMPLETED";
  protected readonly stateType = ComputationStateType.COMPLETED;
  protected readonly permittedTransitions: readonly ComputationStateType[] = [
    ComputationStateType.INITIALIZED,
  ];

  onEntry(_context: IComputationStateTransitionContext): void {
  }

  onExit(_context: IComputationStateTransitionContext): void {
  }
}

import { ComputationStateType } from "../../contracts/IComputationState.js";
import type { IComputationStateTransitionContext } from "../../contracts/IComputationState.js";
import { AbstractBaseComputationState } from "../../abstracts/AbstractBaseComputationState.js";

export class ComposingOutputComputationStateImpl extends AbstractBaseComputationState {
  protected readonly stateName = "ComposingOutputComputationState";
  protected readonly stateVersion = "1.0.0-STATE-COMPOSING-OUTPUT";
  protected readonly stateDescriptor = "COMPUTATION_STATE_COMPOSING_OUTPUT";
  protected readonly stateType = ComputationStateType.COMPOSING_OUTPUT;
  protected readonly permittedTransitions: readonly ComputationStateType[] = [
    ComputationStateType.COMPLETED,
    ComputationStateType.ERROR,
  ];

  onEntry(_context: IComputationStateTransitionContext): void {
  }

  onExit(context: IComputationStateTransitionContext): void {
    const result = context.getCurrentResult();
    if (result === null || result.length === 0) {
      context.setErrorMessage("Output composition produced empty or null result");
    }
  }
}

import type { IComputationState } from "../../contracts/IComputationState.js";
import { AbstractBaseComputationStateMachine } from "../../abstracts/AbstractBaseComputationStateMachine.js";

export class DefaultComputationStateMachineImpl extends AbstractBaseComputationStateMachine {
  protected readonly machineName = "DefaultComputationStateMachine";
  protected readonly machineVersion = "1.0.0-MACHINE-DEFAULT";
  protected readonly machineDescriptor = "COMPUTATION_STATE_MACHINE_DEFAULT";

  constructor(initialState: IComputationState, states: IComputationState[]) {
    super();
    this.setInitialState(initialState);
    for (const state of states) {
      this.registerState(state);
    }
    this.transitionHistory.push(initialState.getStateType());
    this.markInitialized();
  }
}

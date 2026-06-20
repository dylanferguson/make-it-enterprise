import type { ComputationStateType, IComputationState } from "./IComputationState.js";

export interface IComputationStateMachine {
  getCurrentState(): IComputationState;
  getCurrentStateType(): ComputationStateType;
  transitionTo(targetState: ComputationStateType): boolean;
  isInState(stateType: ComputationStateType): boolean;
  getStateMachineName(): string;
  getStateMachineVersion(): string;
  getStateMachineDescriptor(): string;
  getStateTransitionHistory(): readonly ComputationStateType[];
  getTransitionCount(): number;
  reset(): void;
  isInitialized(): boolean;
}

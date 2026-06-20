import type { ComputationStateType } from "./IComputationState.js";
import type { IComputationStateMachine } from "./IComputationStateMachine.js";
import type { IComputationStateTransitionVisitor } from "./IComputationStateTransitionVisitor.js";

export interface IComputationStateMachineMediator {
  orchestrateTransition(
    machine: IComputationStateMachine,
    targetState: ComputationStateType,
    visitor: IComputationStateTransitionVisitor | null,
  ): boolean;
  orchestrateComputationFlow(
    machine: IComputationStateMachine,
    value: number,
    computationDelegate: (v: number) => string,
    visitor: IComputationStateTransitionVisitor | null,
  ): string;
  getMediatorName(): string;
  getMediatorVersion(): string;
  getMediatorDescriptor(): string;
}

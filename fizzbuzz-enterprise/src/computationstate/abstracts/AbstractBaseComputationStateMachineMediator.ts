import type { IComputationStateMachineMediator } from "../contracts/IComputationStateMachineMediator.js";
import type { IComputationStateMachine } from "../contracts/IComputationStateMachine.js";
import type { IComputationStateTransitionVisitor } from "../contracts/IComputationStateTransitionVisitor.js";
import type { ComputationStateType } from "../contracts/IComputationState.js";

export abstract class AbstractBaseComputationStateMachineMediator implements IComputationStateMachineMediator {
  protected abstract readonly mediatorName: string;
  protected abstract readonly mediatorVersion: string;
  protected abstract readonly mediatorDescriptor: string;

  getMediatorName(): string { return this.mediatorName; }
  getMediatorVersion(): string { return this.mediatorVersion; }
  getMediatorDescriptor(): string { return this.mediatorDescriptor; }

  abstract orchestrateTransition(
    machine: IComputationStateMachine,
    targetState: ComputationStateType,
    visitor: IComputationStateTransitionVisitor | null,
  ): boolean;

  abstract orchestrateComputationFlow(
    machine: IComputationStateMachine,
    value: number,
    computationDelegate: (v: number) => string,
    visitor: IComputationStateTransitionVisitor | null,
  ): string;
}

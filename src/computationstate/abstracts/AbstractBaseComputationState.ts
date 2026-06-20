import type { IComputationState, ComputationStateType, IComputationStateTransitionContext } from "../contracts/IComputationState.js";

export abstract class AbstractBaseComputationState implements IComputationState {
  protected abstract readonly stateName: string;
  protected abstract readonly stateVersion: string;
  protected abstract readonly stateDescriptor: string;
  protected abstract readonly stateType: ComputationStateType;
  protected abstract readonly permittedTransitions: readonly ComputationStateType[];

  getStateType(): ComputationStateType { return this.stateType; }
  getStateName(): string { return this.stateName; }
  getStateVersion(): string { return this.stateVersion; }
  getStateDescriptor(): string { return this.stateDescriptor; }

  canTransitionTo(targetState: ComputationStateType): boolean {
    return this.permittedTransitions.includes(targetState);
  }

  getPermittedTransitionTargets(): readonly ComputationStateType[] {
    return [...this.permittedTransitions];
  }

  abstract onEntry(context: IComputationStateTransitionContext): void;
  abstract onExit(context: IComputationStateTransitionContext): void;

  protected formatLog(phase: string, context: IComputationStateTransitionContext): string {
    return `[State:${this.stateType}] ${phase}: value=[${context.getCurrentValue()}], result=[${context.getCurrentResult()}], transitions=[${context.getTransitionCount()}]`;
  }
}

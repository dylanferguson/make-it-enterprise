import type { IComputationStateMachine } from "../contracts/IComputationStateMachine.js";
import type { IComputationState, ComputationStateType } from "../contracts/IComputationState.js";

export abstract class AbstractBaseComputationStateMachine implements IComputationStateMachine {
  protected abstract readonly machineName: string;
  protected abstract readonly machineVersion: string;
  protected abstract readonly machineDescriptor: string;
  protected readonly states: Map<ComputationStateType, IComputationState> = new Map();
  protected currentState!: IComputationState;
  protected readonly transitionHistory: ComputationStateType[] = [];
  protected initialized = false;
  private initialStateType: ComputationStateType | null = null;

  protected setInitialState(state: IComputationState): void {
    this.currentState = state;
    this.initialStateType = state.getStateType();
  }

  getStateMachineName(): string { return this.machineName; }
  getStateMachineVersion(): string { return this.machineVersion; }
  getStateMachineDescriptor(): string { return this.machineDescriptor; }
  getCurrentState(): IComputationState { return this.currentState; }
  getCurrentStateType(): ComputationStateType { return this.currentState.getStateType(); }
  getStateTransitionHistory(): readonly ComputationStateType[] { return [...this.transitionHistory]; }
  getTransitionCount(): number { return this.transitionHistory.length; }
  isInitialized(): boolean { return this.initialized; }

  isInState(stateType: ComputationStateType): boolean {
    return this.currentState.getStateType() === stateType;
  }

  transitionTo(targetState: ComputationStateType): boolean {
    if (!this.currentState.canTransitionTo(targetState)) {
      return false;
    }
    const target = this.states.get(targetState);
    if (target === undefined) {
      return false;
    }
    this.currentState = target;
    this.transitionHistory.push(targetState);
    return true;
  }

  reset(): void {
    if (this.initialStateType !== null) {
      const initial = this.states.get(this.initialStateType);
      if (initial !== undefined) {
        this.currentState = initial;
      }
    }
    this.transitionHistory.length = 0;
  }

  registerState(state: IComputationState): void {
    this.states.set(state.getStateType(), state);
  }

  protected markInitialized(): void {
    this.initialized = true;
  }
}

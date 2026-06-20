export enum ComputationStateType {
  INITIALIZED = "INITIALIZED",
  VALIDATING = "VALIDATING",
  EVALUATING_DIVISIBILITY = "EVALUATING_DIVISIBILITY",
  COMPOSING_OUTPUT = "COMPOSING_OUTPUT",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}

export interface IComputationState {
  getStateType(): ComputationStateType;
  getStateName(): string;
  getStateVersion(): string;
  getStateDescriptor(): string;
  canTransitionTo(targetState: ComputationStateType): boolean;
  getPermittedTransitionTargets(): readonly ComputationStateType[];
  onEntry(context: IComputationStateTransitionContext): void;
  onExit(context: IComputationStateTransitionContext): void;
}

export interface IComputationStateTransitionContext {
  getCurrentValue(): number | null;
  getCurrentResult(): string | null;
  getErrorMessage(): string | null;
  getTransitionCount(): number;
  setCurrentValue(value: number | null): void;
  setCurrentResult(result: string | null): void;
  setErrorMessage(error: string | null): void;
}

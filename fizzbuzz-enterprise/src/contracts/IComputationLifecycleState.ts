export interface IComputationLifecycleState {
  getStateName(): string;
  getStateCode(): string;
  getStatePriority(): number;
  canTransitionTo(targetState: IComputationLifecycleState): boolean;
  isTerminal(): boolean;
  isInitial(): boolean;
  getValidTransitions(): ReadonlyArray<string>;
}

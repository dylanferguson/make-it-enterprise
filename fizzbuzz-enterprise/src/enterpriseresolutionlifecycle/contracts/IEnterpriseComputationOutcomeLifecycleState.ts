export interface IEnterpriseComputationOutcomeLifecycleState {
  getStateName(): string;
  getStateVersion(): string;
  getStateCode(): string;
  canTransitionTo(targetState: IEnterpriseComputationOutcomeLifecycleState): boolean;
  getPermittedTransitionTargetStateCodes(): readonly string[];
}

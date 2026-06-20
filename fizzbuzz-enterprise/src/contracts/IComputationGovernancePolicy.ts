export interface IComputationGovernancePolicy {
  getPolicyName(): string;
  getPolicyVersion(): string;
  getComputationType(): string;
  getPolicyPriority(): number;
  isPolicyEnabled(): boolean;
  setPolicyEnabled(enabled: boolean): void;
  validateComputationValue(value: number): boolean;
  validateComputationResult(value: number, result: string): boolean;
  getPolicyDescription(): string;
}

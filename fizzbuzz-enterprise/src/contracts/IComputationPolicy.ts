export interface IComputationPolicy {
  evaluate(value: number): boolean;
  getPolicyName(): string;
  getPolicyVersion(): string;
  getPolicyPriority(): number;
  getPolicyDescription(): string;
  onPolicyViolation(value: number): void;
}

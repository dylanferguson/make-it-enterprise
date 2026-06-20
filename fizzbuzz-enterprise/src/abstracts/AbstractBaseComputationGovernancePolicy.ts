import type { IComputationGovernancePolicy } from "../contracts/IComputationGovernancePolicy.js";

export abstract class AbstractBaseComputationGovernancePolicy implements IComputationGovernancePolicy {
  protected readonly policyName: string;
  protected readonly policyVersion: string;
  protected readonly computationType: string;
  protected readonly policyPriority: number;
  protected policyEnabled: boolean;
  protected readonly policyDescription: string;

  constructor(
    policyName: string,
    policyVersion: string,
    computationType: string,
    policyPriority: number,
    policyDescription: string,
    enabled: boolean = true,
  ) {
    this.policyName = policyName;
    this.policyVersion = policyVersion;
    this.computationType = computationType;
    this.policyPriority = policyPriority;
    this.policyDescription = policyDescription;
    this.policyEnabled = enabled;
  }

  abstract validateComputationValue(value: number): boolean;

  abstract validateComputationResult(value: number, result: string): boolean;

  getPolicyName(): string {
    return this.policyName;
  }

  getPolicyVersion(): string {
    return this.policyVersion;
  }

  getComputationType(): string {
    return this.computationType;
  }

  getPolicyPriority(): number {
    return this.policyPriority;
  }

  isPolicyEnabled(): boolean {
    return this.policyEnabled;
  }

  setPolicyEnabled(enabled: boolean): void {
    this.policyEnabled = enabled;
  }

  getPolicyDescription(): string {
    return this.policyDescription;
  }
}

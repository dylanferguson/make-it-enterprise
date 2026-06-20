import type { IComputationGovernancePolicyEnforcementGate } from "../contracts/IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicy } from "../contracts/IComputationGovernancePolicy.js";
import { GovernancePolicyViolationException } from "../exceptions/GovernancePolicyViolationException.js";

export abstract class AbstractBaseComputationGovernancePolicyEnforcementGate
  implements IComputationGovernancePolicyEnforcementGate
{
  protected readonly gateName: string;
  protected readonly gateVersion: string;
  protected readonly gateImplementationType: string;

  constructor(
    gateName: string,
    gateVersion: string,
    gateImplementationType: string,
  ) {
    this.gateName = gateName;
    this.gateVersion = gateVersion;
    this.gateImplementationType = gateImplementationType;
  }

  abstract enforcePoliciesBeforeComputation(
    value: number,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): void;

  abstract enforcePoliciesAfterComputation(
    value: number,
    result: string,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): string;

  getGateImplementationType(): string {
    return this.gateImplementationType;
  }

  getGateName(): string {
    return this.gateName;
  }

  getGateVersion(): string {
    return this.gateVersion;
  }

  protected throwPolicyViolation(
    message: string,
    policyName: string,
    value: number,
    context: string,
  ): never {
    throw new GovernancePolicyViolationException(
      message,
      policyName,
      value,
      context,
    );
  }
}

import { AbstractBaseEnterpriseComputationGovernancePolicyEnforcementFacade } from "../../abstracts/AbstractBaseEnterpriseComputationGovernancePolicyEnforcementFacade.js";
import type { IComputationGovernancePolicyEnforcementGate } from "../../contracts/IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicyRegistry } from "../../contracts/IComputationGovernancePolicyRegistry.js";
import type { IComputationGovernancePolicyValidationVisitor } from "../../contracts/IComputationGovernancePolicyValidationVisitor.js";
import { ComputationGovernancePolicyValidationVisitorImpl } from "./ComputationGovernancePolicyValidationVisitorImpl.js";

export class EnterpriseComputationGovernancePolicyEnforcementFacadeImpl
  extends AbstractBaseEnterpriseComputationGovernancePolicyEnforcementFacade
{
  private static readonly FACADE_NAME = "EnterpriseComputationGovernancePolicyEnforcementFacade";
  private static readonly FACADE_VERSION = "1.0.0-GOVERNANCE-FACADE";
  private static readonly GOVERNANCE_CONTEXT = "EnterpriseComputationGovernanceContext";

  constructor(
    enforcementGate: IComputationGovernancePolicyEnforcementGate,
    policyRegistry: IComputationGovernancePolicyRegistry,
    validationVisitor?: IComputationGovernancePolicyValidationVisitor,
  ) {
    super(
      enforcementGate,
      policyRegistry,
      validationVisitor ?? new ComputationGovernancePolicyValidationVisitorImpl(),
      EnterpriseComputationGovernancePolicyEnforcementFacadeImpl.FACADE_NAME,
      EnterpriseComputationGovernancePolicyEnforcementFacadeImpl.FACADE_VERSION,
      EnterpriseComputationGovernancePolicyEnforcementFacadeImpl.GOVERNANCE_CONTEXT,
    );
  }

  override enforceComputation(
    value: number,
    innerResolver: (value: number) => string,
  ): string {
    const policies = this.policyRegistry.getPoliciesForComputationType("FIZZBUZZ_VALUE_RESOLUTION");

    if (policies.length > 0) {
      this.validationVisitor.visitPolicyRegistry(this.policyRegistry);
    }

    this.enforcementGate.enforcePoliciesBeforeComputation(
      value,
      policies,
      this.governanceContext,
    );

    const result = innerResolver(value);

    const enforcedResult = this.enforcementGate.enforcePoliciesAfterComputation(
      value,
      result,
      policies,
      this.governanceContext,
    );

    for (const policy of policies) {
      this.validationVisitor.visitComputationResult(value, enforcedResult, policy);
    }

    return enforcedResult;
  }
}

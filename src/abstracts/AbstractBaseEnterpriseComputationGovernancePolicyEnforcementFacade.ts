import type { IEnterpriseComputationGovernancePolicyEnforcementFacade } from "../contracts/IEnterpriseComputationGovernancePolicyEnforcementFacade.js";
import type { IComputationGovernancePolicyEnforcementGate } from "../contracts/IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicyRegistry } from "../contracts/IComputationGovernancePolicyRegistry.js";
import type { IComputationGovernancePolicyValidationVisitor } from "../contracts/IComputationGovernancePolicyValidationVisitor.js";

export abstract class AbstractBaseEnterpriseComputationGovernancePolicyEnforcementFacade
  implements IEnterpriseComputationGovernancePolicyEnforcementFacade
{
  protected readonly enforcementGate: IComputationGovernancePolicyEnforcementGate;
  protected readonly policyRegistry: IComputationGovernancePolicyRegistry;
  protected readonly validationVisitor: IComputationGovernancePolicyValidationVisitor;
  protected readonly facadeName: string;
  protected readonly facadeVersion: string;
  protected readonly governanceContext: string;

  constructor(
    enforcementGate: IComputationGovernancePolicyEnforcementGate,
    policyRegistry: IComputationGovernancePolicyRegistry,
    validationVisitor: IComputationGovernancePolicyValidationVisitor,
    facadeName: string,
    facadeVersion: string,
    governanceContext: string,
  ) {
    this.enforcementGate = enforcementGate;
    this.policyRegistry = policyRegistry;
    this.validationVisitor = validationVisitor;
    this.facadeName = facadeName;
    this.facadeVersion = facadeVersion;
    this.governanceContext = governanceContext;
  }

  abstract enforceComputation(
    value: number,
    innerResolver: (value: number) => string,
  ): string;

  getEnforcementGate(): IComputationGovernancePolicyEnforcementGate {
    return this.enforcementGate;
  }

  getPolicyRegistry(): IComputationGovernancePolicyRegistry {
    return this.policyRegistry;
  }

  getValidationVisitor(): IComputationGovernancePolicyValidationVisitor {
    return this.validationVisitor;
  }

  getFacadeName(): string {
    return this.facadeName;
  }

  getFacadeVersion(): string {
    return this.facadeVersion;
  }

  getGovernanceContext(): string {
    return this.governanceContext;
  }
}

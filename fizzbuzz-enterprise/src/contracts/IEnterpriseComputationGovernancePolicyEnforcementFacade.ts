import type { IComputationGovernancePolicyEnforcementGate } from "./IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicyValidationVisitor } from "./IComputationGovernancePolicyValidationVisitor.js";
import type { IComputationGovernancePolicyRegistry } from "./IComputationGovernancePolicyRegistry.js";

export interface IEnterpriseComputationGovernancePolicyEnforcementFacade {
  enforceComputation(
    value: number,
    innerResolver: (value: number) => string,
  ): string;
  getEnforcementGate(): IComputationGovernancePolicyEnforcementGate;
  getPolicyRegistry(): IComputationGovernancePolicyRegistry;
  getValidationVisitor(): IComputationGovernancePolicyValidationVisitor;
  getFacadeName(): string;
  getFacadeVersion(): string;
  getGovernanceContext(): string;
}

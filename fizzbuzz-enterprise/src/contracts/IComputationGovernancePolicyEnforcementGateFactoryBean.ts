import type { IComputationGovernancePolicyEnforcementGate } from "./IComputationGovernancePolicyEnforcementGate.js";

export interface IComputationGovernancePolicyEnforcementGateFactoryBean {
  createEnforcementGate(): IComputationGovernancePolicyEnforcementGate;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
}

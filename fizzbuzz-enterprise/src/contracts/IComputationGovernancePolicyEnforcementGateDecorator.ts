import type { IComputationGovernancePolicyEnforcementGate } from "./IComputationGovernancePolicyEnforcementGate.js";

export interface IComputationGovernancePolicyEnforcementGateDecorator
  extends IComputationGovernancePolicyEnforcementGate {
  getWrappedGate(): IComputationGovernancePolicyEnforcementGate;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
}

import { AbstractBaseComputationGovernancePolicyEnforcementGate } from "./AbstractBaseComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicyEnforcementGate } from "../contracts/IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicyEnforcementGateDecorator } from "../contracts/IComputationGovernancePolicyEnforcementGateDecorator.js";

export abstract class AbstractBaseComputationGovernancePolicyEnforcementGateDecorator
  extends AbstractBaseComputationGovernancePolicyEnforcementGate
  implements IComputationGovernancePolicyEnforcementGateDecorator
{
  protected readonly wrappedGate: IComputationGovernancePolicyEnforcementGate;
  protected readonly decoratorName: string;
  protected readonly decoratorVersion: string;

  constructor(
    wrappedGate: IComputationGovernancePolicyEnforcementGate,
    gateName: string,
    gateVersion: string,
    gateImplementationType: string,
    decoratorName: string,
    decoratorVersion: string,
  ) {
    super(gateName, gateVersion, gateImplementationType);
    this.wrappedGate = wrappedGate;
    this.decoratorName = decoratorName;
    this.decoratorVersion = decoratorVersion;
  }

  getWrappedGate(): IComputationGovernancePolicyEnforcementGate {
    return this.wrappedGate;
  }

  getDecoratorName(): string {
    return this.decoratorName;
  }

  getDecoratorVersion(): string {
    return this.decoratorVersion;
  }
}

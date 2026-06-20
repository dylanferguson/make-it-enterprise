import { AbstractBaseComputationGovernancePolicyEnforcementGateDecorator } from "../../../abstracts/AbstractBaseComputationGovernancePolicyEnforcementGateDecorator.js";
import type { IComputationGovernancePolicyEnforcementGate } from "../../../contracts/IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicy } from "../../../contracts/IComputationGovernancePolicy.js";

export class LoggingGovernanceEnforcementGateDecoratorImpl extends AbstractBaseComputationGovernancePolicyEnforcementGateDecorator {
  private static readonly GATE_NAME = "LoggingGovernanceEnforcementGateDecorator";
  private static readonly GATE_VERSION = "1.0.0-GOVERNANCE-LOGGING-DECORATOR";
  private static readonly GATE_IMPLEMENTATION_TYPE = "DECORATOR_LOGGING";
  private static readonly DECORATOR_NAME = "LoggingGovernanceEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-GOVERNANCE-LOGGING-DECORATOR";
  private static invocationCounter = 0;

  constructor(wrappedGate: IComputationGovernancePolicyEnforcementGate) {
    super(
      wrappedGate,
      LoggingGovernanceEnforcementGateDecoratorImpl.GATE_NAME,
      LoggingGovernanceEnforcementGateDecoratorImpl.GATE_VERSION,
      LoggingGovernanceEnforcementGateDecoratorImpl.GATE_IMPLEMENTATION_TYPE,
      LoggingGovernanceEnforcementGateDecoratorImpl.DECORATOR_NAME,
      LoggingGovernanceEnforcementGateDecoratorImpl.DECORATOR_VERSION,
    );
  }

  override enforcePoliciesBeforeComputation(
    value: number,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): void {
    LoggingGovernanceEnforcementGateDecoratorImpl.invocationCounter++;
    console.debug(
      `[${this.getDecoratorName()}] #${LoggingGovernanceEnforcementGateDecoratorImpl.invocationCounter} ` +
      `Pre-computation governance check: value=${value}, policies=${policies.length}, context=${context}`,
    );
    this.wrappedGate.enforcePoliciesBeforeComputation(value, policies, context);
    console.debug(
      `[${this.getDecoratorName()}] #${LoggingGovernanceEnforcementGateDecoratorImpl.invocationCounter} ` +
      `Pre-computation governance check PASSED for value=${value}`,
    );
  }

  override enforcePoliciesAfterComputation(
    value: number,
    result: string,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): string {
    console.debug(
      `[${this.getDecoratorName()}] #${LoggingGovernanceEnforcementGateDecoratorImpl.invocationCounter} ` +
      `Post-computation governance check: value=${value}, result="${result}", policies=${policies.length}`,
    );
    const enforcedResult = this.wrappedGate.enforcePoliciesAfterComputation(value, result, policies, context);
    console.debug(
      `[${this.getDecoratorName()}] #${LoggingGovernanceEnforcementGateDecoratorImpl.invocationCounter} ` +
      `Post-computation governance check PASSED for value=${value}, result="${enforcedResult}"`,
    );
    return enforcedResult;
  }

  static getTotalInvocations(): number {
    return LoggingGovernanceEnforcementGateDecoratorImpl.invocationCounter;
  }
}

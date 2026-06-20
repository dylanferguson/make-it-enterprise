import { AbstractBaseComputationGovernancePolicyEnforcementGateDecorator } from "../../../abstracts/AbstractBaseComputationGovernancePolicyEnforcementGateDecorator.js";
import type { IComputationGovernancePolicyEnforcementGate } from "../../../contracts/IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicy } from "../../../contracts/IComputationGovernancePolicy.js";

export class RetryGovernanceEnforcementGateDecoratorImpl extends AbstractBaseComputationGovernancePolicyEnforcementGateDecorator {
  private static readonly GATE_NAME = "RetryGovernanceEnforcementGateDecorator";
  private static readonly GATE_VERSION = "1.0.0-GOVERNANCE-RETRY-DECORATOR";
  private static readonly GATE_IMPLEMENTATION_TYPE = "DECORATOR_RETRY";
  private static readonly DECORATOR_NAME = "RetryGovernanceEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-GOVERNANCE-RETRY-DECORATOR";

  private readonly maxRetries: number;
  private retryCount: number = 0;

  constructor(
    wrappedGate: IComputationGovernancePolicyEnforcementGate,
    maxRetries: number = 3,
  ) {
    super(
      wrappedGate,
      RetryGovernanceEnforcementGateDecoratorImpl.GATE_NAME,
      RetryGovernanceEnforcementGateDecoratorImpl.GATE_VERSION,
      RetryGovernanceEnforcementGateDecoratorImpl.GATE_IMPLEMENTATION_TYPE,
      RetryGovernanceEnforcementGateDecoratorImpl.DECORATOR_NAME,
      RetryGovernanceEnforcementGateDecoratorImpl.DECORATOR_VERSION,
    );
    this.maxRetries = maxRetries;
  }

  override enforcePoliciesBeforeComputation(
    value: number,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): void {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        this.wrappedGate.enforcePoliciesBeforeComputation(value, policies, context);
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        this.retryCount++;
        if (attempt < this.maxRetries) {
          console.debug(
            `[${this.getDecoratorName()}] Retry attempt ${attempt + 1}/${this.maxRetries} for pre-computation governance on value=${value}`,
          );
        }
      }
    }
    throw lastError!;
  }

  override enforcePoliciesAfterComputation(
    value: number,
    result: string,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): string {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return this.wrappedGate.enforcePoliciesAfterComputation(value, result, policies, context);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        this.retryCount++;
        if (attempt < this.maxRetries) {
          console.debug(
            `[${this.getDecoratorName()}] Retry attempt ${attempt + 1}/${this.maxRetries} for post-computation governance on value=${value}, result="${result}"`,
          );
        }
      }
    }
    throw lastError!;
  }

  getRetryCount(): number {
    return this.retryCount;
  }

  getMaxRetries(): number {
    return this.maxRetries;
  }
}

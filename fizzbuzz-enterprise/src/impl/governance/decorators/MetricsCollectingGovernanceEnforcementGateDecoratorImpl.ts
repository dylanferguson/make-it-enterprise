import { AbstractBaseComputationGovernancePolicyEnforcementGateDecorator } from "../../../abstracts/AbstractBaseComputationGovernancePolicyEnforcementGateDecorator.js";
import type { IComputationGovernancePolicyEnforcementGate } from "../../../contracts/IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicy } from "../../../contracts/IComputationGovernancePolicy.js";
import type { IValidationEnforcementMetricsCollector } from "../../../contracts/IValidationEnforcementMetricsCollector.js";

export class MetricsCollectingGovernanceEnforcementGateDecoratorImpl extends AbstractBaseComputationGovernancePolicyEnforcementGateDecorator {
  private static readonly GATE_NAME = "MetricsCollectingGovernanceEnforcementGateDecorator";
  private static readonly GATE_VERSION = "1.0.0-GOVERNANCE-METRICS-DECORATOR";
  private static readonly GATE_IMPLEMENTATION_TYPE = "DECORATOR_METRICS";
  private static readonly DECORATOR_NAME = "MetricsCollectingGovernanceEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-GOVERNANCE-METRICS-DECORATOR";

  private readonly metricsCollector: IValidationEnforcementMetricsCollector;
  private preEnforcementCount: number = 0;
  private postEnforcementCount: number = 0;
  private preEnforcementFailureCount: number = 0;
  private postEnforcementFailureCount: number = 0;

  constructor(
    wrappedGate: IComputationGovernancePolicyEnforcementGate,
    metricsCollector: IValidationEnforcementMetricsCollector,
  ) {
    super(
      wrappedGate,
      MetricsCollectingGovernanceEnforcementGateDecoratorImpl.GATE_NAME,
      MetricsCollectingGovernanceEnforcementGateDecoratorImpl.GATE_VERSION,
      MetricsCollectingGovernanceEnforcementGateDecoratorImpl.GATE_IMPLEMENTATION_TYPE,
      MetricsCollectingGovernanceEnforcementGateDecoratorImpl.DECORATOR_NAME,
      MetricsCollectingGovernanceEnforcementGateDecoratorImpl.DECORATOR_VERSION,
    );
    this.metricsCollector = metricsCollector;
  }

  override enforcePoliciesBeforeComputation(
    value: number,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): void {
    this.preEnforcementCount++;
    const startTime = performance.now();
    try {
      this.wrappedGate.enforcePoliciesBeforeComputation(value, policies, context);
      this.metricsCollector.recordDecoratorInvocation(
        this.getDecoratorName(),
        Math.trunc((performance.now() - startTime) * 1000),
      );
    } catch (error) {
      this.preEnforcementFailureCount++;
      for (const policy of policies) {
        this.metricsCollector.recordPolicyViolation(policy.getPolicyName(), value, 0);
      }
      throw error;
    }
  }

  override enforcePoliciesAfterComputation(
    value: number,
    result: string,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): string {
    this.postEnforcementCount++;
    const startTime = performance.now();
    try {
      const enforcedResult = this.wrappedGate.enforcePoliciesAfterComputation(value, result, policies, context);
      this.metricsCollector.recordDecoratorInvocation(
        this.getDecoratorName(),
        Math.trunc((performance.now() - startTime) * 1000),
      );
      return enforcedResult;
    } catch (error) {
      this.postEnforcementFailureCount++;
      for (const policy of policies) {
        this.metricsCollector.recordPolicyViolation(policy.getPolicyName(), value, 0);
      }
      throw error;
    }
  }

  getPreEnforcementCount(): number {
    return this.preEnforcementCount;
  }

  getPostEnforcementCount(): number {
    return this.postEnforcementCount;
  }

  getPreEnforcementFailureCount(): number {
    return this.preEnforcementFailureCount;
  }

  getPostEnforcementFailureCount(): number {
    return this.postEnforcementFailureCount;
  }

  getMetricsCollector(): IValidationEnforcementMetricsCollector {
    return this.metricsCollector;
  }
}

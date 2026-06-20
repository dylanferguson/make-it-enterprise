import { AbstractBaseComputationPolicyDecisionPoint } from "../../abstracts/AbstractBaseComputationPolicyDecisionPoint.js";
import type { IComputationPolicyDecision } from "../../contracts/IComputationPolicyDecision.js";
import { FizzBuzzComputationPolicyDecisionImpl } from "./FizzBuzzComputationPolicyDecisionImpl.js";
import { FizzBuzzConstraintValidationPolicyImpl } from "./FizzBuzzConstraintValidationPolicyImpl.js";

export class FizzBuzzComputationPolicyDecisionPointImpl extends AbstractBaseComputationPolicyDecisionPoint {
  private static readonly DECISION_POINT_NAME = "FizzBuzzComputationPolicyDecisionPoint";
  private static readonly DECISION_POINT_VERSION = "2.0.0-ENTERPRISE";
  private static readonly DECISION_POINT_POLICY_PREFIX = "FizzBuzz";
  private evaluationCount: number = 0;

  constructor() {
    super();
    this.registerPolicy(new FizzBuzzConstraintValidationPolicyImpl());
  }

  override evaluate(value: number): IComputationPolicyDecision {
    this.evaluationCount++;
    if (!this.active) {
      return new FizzBuzzComputationPolicyDecisionImpl(
        true,
        ["DecisionPointInactive"],
        `Decision point [${this.getDecisionPointName()}] is inactive — all computations allowed`,
      );
    }
    const { allowed, violatingPolicies } = this.evaluatePolicies(value);
    const policyNames = this.policies.map((p) => p.getPolicyName());
    let message: string;
    if (allowed) {
      message = `All [${this.policies.length}] computation policies satisfied for value [${value}]`;
    } else {
      const violationNames = violatingPolicies.map((p) => p.getPolicyName());
      message = `Computation denied: [${violationNames.length}] of [${this.policies.length}] policies violated for value [${value}]: ${violationNames.join(", ")}`;
    }
    return new FizzBuzzComputationPolicyDecisionImpl(allowed, policyNames, message);
  }

  override getDecisionPointName(): string {
    return FizzBuzzComputationPolicyDecisionPointImpl.DECISION_POINT_NAME;
  }

  override getDecisionPointVersion(): string {
    return FizzBuzzComputationPolicyDecisionPointImpl.DECISION_POINT_VERSION;
  }

  getEvaluationCount(): number {
    return this.evaluationCount;
  }
}

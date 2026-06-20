import { AbstractBaseComputationPolicy } from "../../abstracts/AbstractBaseComputationPolicy.js";

export class FizzBuzzConstraintValidationPolicyImpl extends AbstractBaseComputationPolicy {
  private static readonly POLICY_NAME = "FizzBuzzConstraintValidationPolicy";
  private static readonly POLICY_VERSION = "1.0.0-ENTERPRISE";
  private static readonly POLICY_PRIORITY = 100;
  private static readonly POLICY_DESCRIPTION =
    "Validates that input values are finite, non-negative, and within acceptable computation range";

  private readonly maxComputationValue: number;

  constructor(maxComputationValue: number = 2147483647) {
    super();
    this.maxComputationValue = maxComputationValue;
  }

  override evaluate(value: number): boolean {
    if (!Number.isFinite(value)) {
      return false;
    }
    if (value < 0) {
      return false;
    }
    if (value > this.maxComputationValue) {
      return false;
    }
    return true;
  }

  override getPolicyName(): string {
    return FizzBuzzConstraintValidationPolicyImpl.POLICY_NAME;
  }

  override getPolicyVersion(): string {
    return FizzBuzzConstraintValidationPolicyImpl.POLICY_VERSION;
  }

  override getPolicyPriority(): number {
    return FizzBuzzConstraintValidationPolicyImpl.POLICY_PRIORITY;
  }

  override getPolicyDescription(): string {
    return FizzBuzzConstraintValidationPolicyImpl.POLICY_DESCRIPTION;
  }

  override onPolicyViolation(value: number): void {
    super.onPolicyViolation(value);
    throw new Error(
      `[${this.getPolicyName()}] Computed value violation: value=${value}, maxAllowed=${this.maxComputationValue}. ` +
      `FizzBuzz computation policy disallows processing of value [${value}]. ` +
      `Constraint: finite=${Number.isFinite(value)}, nonNegative=${value >= 0}, withinRange=${value <= this.maxComputationValue}`,
    );
  }
}

import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class ComputationPolicyViolationException extends FizzBuzzEnterpriseException {
  private readonly violatingPolicyName: string;
  private readonly computedValue: number;

  constructor(
    policyName: string,
    value: number,
    message: string,
    errorCause: Error | null = null,
  ) {
    super(
      `[${policyName}] ${message} (value: ${value})`,
      "FIZZBUZZ-PDP-0001",
      errorCause,
    );
    this.name = "ComputationPolicyViolationException" as typeof Error.prototype.name;
    this.violatingPolicyName = policyName;
    this.computedValue = value;
  }

  getViolatingPolicyName(): string {
    return this.violatingPolicyName;
  }

  getComputedValue(): number {
    return this.computedValue;
  }
}

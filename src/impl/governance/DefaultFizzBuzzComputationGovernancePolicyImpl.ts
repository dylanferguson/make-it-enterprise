import { AbstractBaseComputationGovernancePolicy } from "../../abstracts/AbstractBaseComputationGovernancePolicy.js";

export class DefaultFizzBuzzComputationGovernancePolicyImpl extends AbstractBaseComputationGovernancePolicy {
  private static readonly POLICY_NAME = "DefaultFizzBuzzComputationGovernancePolicy";
  private static readonly POLICY_VERSION = "1.0.0-GOVERNANCE-POLICY-FIZZBUZZ";
  private static readonly COMPUTATION_TYPE = "FIZZBUZZ_VALUE_RESOLUTION";
  private static readonly POLICY_PRIORITY = 100;
  private static readonly POLICY_DESCRIPTION =
    "Enforces standard FizzBuzz computation governance rules: validates that input values " +
    "fall within the acceptable computation range (0-65535) and that results conform to " +
    "the expected FizzBuzz output format constraints.";

  private readonly minAcceptableValue: number;
  private readonly maxAcceptableValue: number;

  constructor(
    minValue: number = 0,
    maxValue: number = 65535,
  ) {
    super(
      DefaultFizzBuzzComputationGovernancePolicyImpl.POLICY_NAME,
      DefaultFizzBuzzComputationGovernancePolicyImpl.POLICY_VERSION,
      DefaultFizzBuzzComputationGovernancePolicyImpl.COMPUTATION_TYPE,
      DefaultFizzBuzzComputationGovernancePolicyImpl.POLICY_PRIORITY,
      DefaultFizzBuzzComputationGovernancePolicyImpl.POLICY_DESCRIPTION,
      true,
    );
    this.minAcceptableValue = minValue;
    this.maxAcceptableValue = maxValue;
  }

  override validateComputationValue(value: number): boolean {
    return (
      Number.isFinite(value) &&
      Number.isInteger(value) &&
      value >= this.minAcceptableValue &&
      value <= this.maxAcceptableValue
    );
  }

  override validateComputationResult(value: number, result: string): boolean {
    if (result === null || result === undefined) {
      return false;
    }
    if (typeof result !== "string") {
      return false;
    }
    if (result.length === 0) {
      return false;
    }
    if (value % 3 === 0 && value % 5 === 0) {
      return result === "FizzBuzz";
    }
    if (value % 3 === 0) {
      return result === "Fizz";
    }
    if (value % 5 === 0) {
      return result === "Buzz";
    }
    return result === String(value);
  }
}

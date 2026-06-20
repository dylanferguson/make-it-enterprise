import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class GovernancePolicyViolationException extends FizzBuzzEnterpriseException {
  private readonly policyName: string;
  private readonly violationValue: number;
  private readonly governanceContext: string;

  constructor(
    message: string,
    policyName: string,
    violationValue: number,
    governanceContext: string,
    errorCause?: Error,
  ) {
    super(
      `[GovernancePolicyViolation] ${message} (policy=${policyName}, value=${violationValue}, context=${governanceContext})`,
      "FIZZBUZZ-GOV-0001",
      errorCause ?? null,
    );
    this.name = "GovernancePolicyViolationException" as typeof Error.prototype.name;
    this.policyName = policyName;
    this.violationValue = violationValue;
    this.governanceContext = governanceContext;
  }

  getPolicyName(): string {
    return this.policyName;
  }

  getViolationValue(): number {
    return this.violationValue;
  }

  getGovernanceContext(): string {
    return this.governanceContext;
  }
}

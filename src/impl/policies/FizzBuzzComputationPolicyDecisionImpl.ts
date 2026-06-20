import type { IComputationPolicyDecision } from "../../contracts/IComputationPolicyDecision.js";

export class FizzBuzzComputationPolicyDecisionImpl implements IComputationPolicyDecision {
  private static readonly DECISION_VERSION = "1.0.0-ENTERPRISE";
  private readonly allowed: boolean;
  private readonly decisionCode: string;
  private readonly decisionMessage: string;
  private readonly evaluatedPolicies: readonly string[];
  private readonly decisionTimestamp: Date;

  constructor(
    allowed: boolean,
    evaluatedPolicies: readonly string[],
    decisionMessage?: string,
  ) {
    this.allowed = allowed;
    this.evaluatedPolicies = evaluatedPolicies;
    this.decisionCode = allowed ? "PDP-ALLOW-0000" : "PDP-DENY-0001";
    this.decisionMessage = decisionMessage ?? (
      allowed
        ? "All computation policies satisfied"
        : "One or more computation policies violated"
    );
    this.decisionTimestamp = new Date();
  }

  isAllowed(): boolean {
    return this.allowed;
  }

  getDecisionCode(): string {
    return this.decisionCode;
  }

  getDecisionMessage(): string {
    return this.decisionMessage;
  }

  getEvaluatedPolicies(): readonly string[] {
    return this.evaluatedPolicies;
  }

  getDecisionTimestamp(): Date {
    return this.decisionTimestamp;
  }

  getDecisionMetadata(): Record<string, unknown> {
    return {
      decisionCode: this.decisionCode,
      decisionVersion: FizzBuzzComputationPolicyDecisionImpl.DECISION_VERSION,
      allowed: this.allowed,
      evaluatedPolicyCount: this.evaluatedPolicies.length,
      evaluatedPolicies: [...this.evaluatedPolicies],
      decisionTimestamp: this.decisionTimestamp.toISOString(),
    };
  }
}

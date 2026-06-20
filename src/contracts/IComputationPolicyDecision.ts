export interface IComputationPolicyDecision {
  isAllowed(): boolean;
  getDecisionCode(): string;
  getDecisionMessage(): string;
  getEvaluatedPolicies(): readonly string[];
  getDecisionTimestamp(): Date;
  getDecisionMetadata(): Record<string, unknown>;
}

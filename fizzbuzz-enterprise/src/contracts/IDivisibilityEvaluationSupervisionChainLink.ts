export interface IDivisibilityEvaluationSupervisionChainLink {
  evaluateDivisibility(dividend: number, divisor: number): boolean;
  setNext(link: IDivisibilityEvaluationSupervisionChainLink): IDivisibilityEvaluationSupervisionChainLink;
  getLinkName(): string;
  getLinkPriority(): number;
}

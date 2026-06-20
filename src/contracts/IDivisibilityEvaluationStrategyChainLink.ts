export interface IDivisibilityEvaluationStrategyChainLink {
  setNext(link: IDivisibilityEvaluationStrategyChainLink): IDivisibilityEvaluationStrategyChainLink;
  evaluate(dividend: number, divisor: number): number;
  getLinkName(): string;
  getLinkPriority(): number;
  canHandle(dividend: number, divisor: number): boolean;
}

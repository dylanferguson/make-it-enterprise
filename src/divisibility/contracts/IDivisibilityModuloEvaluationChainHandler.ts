export interface IDivisibilityModuloEvaluationChainHandler {
  getHandlerName(): string;
  getHandlerVersion(): string;
  getHandlerPriority(): number;
  setNext(handler: IDivisibilityModuloEvaluationChainHandler): IDivisibilityModuloEvaluationChainHandler;
  handleModuloEvaluation(dividend: number, divisor: number, evaluationContext: string | null): number;
}

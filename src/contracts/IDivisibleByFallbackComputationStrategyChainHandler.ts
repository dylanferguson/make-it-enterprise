export interface IDivisibleByFallbackComputationStrategyChainHandler {
  setNext(handler: IDivisibleByFallbackComputationStrategyChainHandler): IDivisibleByFallbackComputationStrategyChainHandler;
  handleFallbackComputation(dividend: number, divisor: number, computationContext: string): number;
  getHandlerName(): string;
  getHandlerPriority(): number;
  canHandle(dividend: number, divisor: number): boolean;
}

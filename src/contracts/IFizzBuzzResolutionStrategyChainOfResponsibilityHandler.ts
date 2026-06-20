export interface IFizzBuzzResolutionStrategyChainOfResponsibilityHandler {
  handleResolution(
    value: number,
    innerResolver: (value: number) => string,
    context: string | null,
  ): string | null;
  canHandle(value: number): boolean;
  getHandlerName(): string;
  getHandlerPriority(): number;
  setNextHandler(next: IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null): void;
  getNextHandler(): IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null;
}

export interface IFizzBuzzResolutionStrategyChainOfResponsibilityManager {
  resolveThroughChain(value: number, innerResolver: (value: number) => string): string;
  getChainName(): string;
  getChainVersion(): string;
  getRegisteredHandlerCount(): number;
  getRegisteredHandlerNames(): readonly string[];
  getChainHead(): IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null;
}

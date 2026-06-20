import type { IAbstractDivisibilityStrategyProvider } from "./IAbstractDivisibilityStrategyProvider.js";

export interface IDivisibilityStrategyChainOfResponsibilityHandler {
  evaluateDivisibility(
    value: number,
    divisor: number,
    next: (v: number, d: number) => boolean,
  ): boolean;
  getHandlerName(): string;
  getHandlerVersion(): string;
  setNextHandler(
    handler: IDivisibilityStrategyChainOfResponsibilityHandler,
  ): void;
  getNextHandler(): IDivisibilityStrategyChainOfResponsibilityHandler | null;
}

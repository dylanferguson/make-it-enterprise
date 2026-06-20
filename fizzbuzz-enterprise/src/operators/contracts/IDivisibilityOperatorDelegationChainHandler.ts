import type { IDivisibilityOperator } from "./IDivisibilityOperator.js";

export interface IDivisibilityOperatorDelegationChainHandler {
  getHandlerName(): string;
  getHandlerVersion(): string;
  getHandlerPriority(): number;
  setNextHandler(next: IDivisibilityOperatorDelegationChainHandler): void;
  getNextHandler(): IDivisibilityOperatorDelegationChainHandler | null;
  evaluateDivisibility(dividend: number, divisor: number): boolean;
  canHandle(dividend: number, divisor: number): boolean;
}

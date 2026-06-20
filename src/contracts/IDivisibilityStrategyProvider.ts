import type { IDivisibilityStrategyResolutionHandler } from "./IDivisibilityStrategyResolutionHandler.js";

export interface IDivisibilityStrategyProvider {
  checkDivisibility(
    dividend: number,
    divisor: number,
    evaluationContext: object | null,
  ): boolean;
  registerResolutionHandler(
    handler: IDivisibilityStrategyResolutionHandler,
  ): void;
  getProviderName(): string;
  getProviderVersion(): string;
}

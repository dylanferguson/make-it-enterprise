import type { IFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "./IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";

export interface IFizzBuzzResolutionStrategyChainOfResponsibilityManager {
  resolveThroughChain(value: number, innerResolver: (value: number) => string): string;
  getChainName(): string;
  getChainVersion(): string;
  getRegisteredHandlerCount(): number;
  getRegisteredHandlerNames(): readonly string[];
  getChainHead(): IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null;
}

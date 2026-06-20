import type { IEnterpriseDivisibilityOrchestrationCommand } from "./IEnterpriseDivisibilityOrchestrationCommand.js";
import type { IEnterpriseDivisibilityOrchestrationInvoker } from "./IEnterpriseDivisibilityOrchestrationInvoker.js";

export interface IEnterpriseDivisibilityOrchestrationStrategyResolver {
  getResolverName(): string;
  getResolverVersion(): string;
  resolveInvoker(): IEnterpriseDivisibilityOrchestrationInvoker;
  resolveCommandForDivisor(divisor: number): IEnterpriseDivisibilityOrchestrationCommand;
}

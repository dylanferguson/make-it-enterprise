import type { IEnterpriseDivisibilityOrchestrationStrategyResolver } from "../contracts/IEnterpriseDivisibilityOrchestrationStrategyResolver.js";
import type { IEnterpriseDivisibilityOrchestrationInvoker } from "../contracts/IEnterpriseDivisibilityOrchestrationInvoker.js";
import type { IEnterpriseDivisibilityOrchestrationCommand } from "../contracts/IEnterpriseDivisibilityOrchestrationCommand.js";

export abstract class AbstractBaseEnterpriseDivisibilityOrchestrationStrategyResolver
  implements IEnterpriseDivisibilityOrchestrationStrategyResolver
{
  private readonly resolverName: string;
  private readonly resolverVersion: string;

  constructor(resolverName: string, resolverVersion: string) {
    this.resolverName = resolverName;
    this.resolverVersion = resolverVersion;
  }

  getResolverName(): string {
    return this.resolverName;
  }

  getResolverVersion(): string {
    return this.resolverVersion;
  }

  abstract resolveInvoker(): IEnterpriseDivisibilityOrchestrationInvoker;
  abstract resolveCommandForDivisor(divisor: number): IEnterpriseDivisibilityOrchestrationCommand;
}

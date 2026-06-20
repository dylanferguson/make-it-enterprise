import type { IFizzBuzzOutputStringResolutionResult } from "../contracts/index.js";

export class AbstractBaseFizzBuzzOutputStringResolutionResult
  implements IFizzBuzzOutputStringResolutionResult
{
  private readonly resolvedValue: string;
  private readonly resolvedStrategyName: string;
  private readonly resolvedStrategyVersion: string;
  private readonly resolvedStrategyIdentifier: string;

  constructor(
    resolvedValue: string,
    resolvedStrategyName: string,
    resolvedStrategyVersion: string,
    resolvedStrategyIdentifier: string,
  ) {
    this.resolvedValue = resolvedValue;
    this.resolvedStrategyName = resolvedStrategyName;
    this.resolvedStrategyVersion = resolvedStrategyVersion;
    this.resolvedStrategyIdentifier = resolvedStrategyIdentifier;
  }

  getResolvedValue(): string {
    return this.resolvedValue;
  }

  getResolvedStrategyName(): string {
    return this.resolvedStrategyName;
  }

  getResolvedStrategyVersion(): string {
    return this.resolvedStrategyVersion;
  }

  getResolvedStrategyIdentifier(): string {
    return this.resolvedStrategyIdentifier;
  }

  isResolved(): boolean {
    return this.resolvedValue !== null && this.resolvedValue !== undefined;
  }
}

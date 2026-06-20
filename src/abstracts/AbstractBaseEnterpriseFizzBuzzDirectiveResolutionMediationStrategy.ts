import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";
import type { IEnterpriseFizzBuzzResolutionDirective } from "../contracts/IEnterpriseFizzBuzzResolutionDirective.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategy
  implements IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy
{
  protected readonly strategyName: string;
  protected readonly strategyVersion: string;
  protected readonly strategyPriority: number;

  constructor(
    strategyName: string,
    strategyVersion: string,
    strategyPriority: number = 0,
  ) {
    this.strategyName = strategyName;
    this.strategyVersion = strategyVersion;
    this.strategyPriority = strategyPriority;
  }

  abstract resolveSingleValueDirective(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
  ): string;
  abstract resolveRangeDirective(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
    start: number,
    end: number,
  ): readonly string[];

  getStrategyName(): string {
    return this.strategyName;
  }

  getStrategyVersion(): string {
    return this.strategyVersion;
  }

  getStrategyPriority(): number {
    return this.strategyPriority;
  }

  protected validateDirectiveValue(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.strategyName} v${this.strategyVersion}] Invalid directive value: ${value}`,
      );
    }
  }

  protected validateRangeBounds(start: number, end: number): void {
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      throw new Error(
        `[${this.strategyName}] Range bounds must be finite: start=${start}, end=${end}`,
      );
    }
    if (start > end) {
      throw new Error(
        `[${this.strategyName}] Range start (${start}) must not exceed end (${end})`,
      );
    }
  }
}

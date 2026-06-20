import type { IFizzBuzzSingleValueResolutionFacade } from "../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputationStrategySelectionFacade } from "../contracts/IEnterpriseComputationStrategySelectionFacade.js";

export abstract class AbstractBaseEnterpriseComputationStrategySelectionFacade
  implements IEnterpriseComputationStrategySelectionFacade
{
  protected static readonly FACADE_FRAMEWORK_VERSION = "1.0.0-STRATEGY-SELECTION-FACADE-FRAMEWORK";

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getSelectionFacadeName(): string;
  abstract getSelectionFacadeVersion(): string;

  protected validateResolutionValue(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.getSelectionFacadeName()} v${this.getSelectionFacadeVersion()}] Invalid resolution value: ${value}. Must be a finite non-negative number.`,
      );
    }
  }

  protected validateRangeBounds(start: number, end: number): void {
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      throw new Error(
        `[${this.getSelectionFacadeName()}] Range bounds must be finite: start=${start}, end=${end}`,
      );
    }
    if (start > end) {
      throw new Error(
        `[${this.getSelectionFacadeName()}] Range start (${start}) must not exceed end (${end})`,
      );
    }
    const rangeSize = end - start + 1;
    if (rangeSize > 1000000) {
      throw new Error(
        `[${this.getSelectionFacadeName()}] Range size ${rangeSize} exceeds maximum of 1000000`,
      );
    }
  }
}

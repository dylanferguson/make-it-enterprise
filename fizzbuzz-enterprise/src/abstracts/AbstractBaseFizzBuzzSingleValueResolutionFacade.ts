import type { IFizzBuzzSingleValueResolutionFacade } from "../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export abstract class AbstractBaseFizzBuzzSingleValueResolutionFacade
  implements IFizzBuzzSingleValueResolutionFacade
{
  private static readonly FACADE_FRAMEWORK_VERSION = "1.0.0-RESOLUTION-FACADE-FRAMEWORK";
  private static readonly DEFAULT_RESOLUTION_TIMEOUT_MS = 30000;
  private static readonly RESOLUTION_MAX_RETRY_COUNT = 3;

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;

  protected validateResolutionValue(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.getFacadeName()} v${this.getFacadeVersion()}] Invalid resolution value: ${value}. Must be a finite non-negative number.`,
      );
    }
  }

  protected validateRangeBounds(start: number, end: number): void {
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      throw new Error(
        `[${this.getFacadeName()}] Range bounds must be finite: start=${start}, end=${end}`,
      );
    }
    if (start > end) {
      throw new Error(
        `[${this.getFacadeName()}] Range start (${start}) must not exceed end (${end})`,
      );
    }
    const rangeSize = end - start + 1;
    if (rangeSize > 1000000) {
      throw new Error(
        `[${this.getFacadeName()}] Range size ${rangeSize} exceeds maximum of 1000000`,
      );
    }
  }

  protected createResolutionContextId(value: number): string {
    return `res:ctx:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }

  protected getResolutionTimeoutMs(): number {
    return AbstractBaseFizzBuzzSingleValueResolutionFacade.DEFAULT_RESOLUTION_TIMEOUT_MS;
  }

  protected getResolutionMaxRetryCount(): number {
    return AbstractBaseFizzBuzzSingleValueResolutionFacade.RESOLUTION_MAX_RETRY_COUNT;
  }

  protected getFacadeFrameworkVersion(): string {
    return AbstractBaseFizzBuzzSingleValueResolutionFacade.FACADE_FRAMEWORK_VERSION;
  }
}

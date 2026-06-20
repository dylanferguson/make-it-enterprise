import type { IFizzBuzzComputationBridge } from "../contracts/IFizzBuzzComputationBridge.js";
import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";
import type { IRangeCalculator } from "../contracts/IRangeCalculator.js";

export abstract class AbstractBaseFizzBuzzComputationBridge implements IFizzBuzzComputationBridge {
  protected readonly valueResolver: ICompositeValueResolver;
  protected readonly rangeCalculator: IRangeCalculator;
  private static readonly BRIDGE_INTERCEPTOR_REGISTRY_VERSION = "1.0.0";
  protected preResolveInterceptors: Array<(value: number) => void> = [];
  protected postResolveInterceptors: Array<(value: number, result: string) => void> = [];

  constructor(valueResolver: ICompositeValueResolver, rangeCalculator: IRangeCalculator) {
    this.valueResolver = valueResolver;
    this.rangeCalculator = rangeCalculator;
  }

  abstract getBridgeName(): string;
  abstract getBridgeVersion(): string;

  getValueResolver(): ICompositeValueResolver {
    return this.valueResolver;
  }

  getRangeCalculator(): IRangeCalculator {
    return this.rangeCalculator;
  }

  registerPreResolveInterceptor(interceptor: (value: number) => void): void {
    this.preResolveInterceptors.push(interceptor);
  }

  registerPostResolveInterceptor(interceptor: (value: number, result: string) => void): void {
    this.postResolveInterceptors.push(interceptor);
  }

  resolveValue(value: number): string {
    this.beforeResolve(value);
    const result = this.doResolve(value);
    this.afterResolve(value, result);
    return result;
  }

  calculateRange(start: number, end: number): readonly string[] {
    this.beforeRangeCalculate(start, end);
    const results = this.doCalculateRange(start, end);
    this.afterRangeCalculate(start, end, results);
    return results;
  }

  protected abstract doResolve(value: number): string;
  protected abstract doCalculateRange(start: number, end: number): readonly string[];

  protected beforeResolve(value: number): void {
    for (const interceptor of this.preResolveInterceptors) {
      interceptor(value);
    }
  }

  protected afterResolve(value: number, result: string): void {
    for (const interceptor of this.postResolveInterceptors) {
      interceptor(value, result);
    }
  }

  protected beforeRangeCalculate(_start: number, _end: number): void {
  }

  protected afterRangeCalculate(_start: number, _end: number, _results: readonly string[]): void {
  }

  protected getInterceptorRegistryVersion(): string {
    return AbstractBaseFizzBuzzComputationBridge.BRIDGE_INTERCEPTOR_REGISTRY_VERSION;
  }
}

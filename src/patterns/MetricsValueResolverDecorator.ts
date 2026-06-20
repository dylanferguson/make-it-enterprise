import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export class MetricsValueResolverDecorator implements ICompositeValueResolver {
  private readonly decorated: ICompositeValueResolver;
  private resolveCount: number = 0;
  private totalResolveTimeMs: number = 0;

  constructor(decorated: ICompositeValueResolver) {
    this.decorated = decorated;
  }

  resolve(value: number): string {
    const startTime = performance.now();
    this.resolveCount++;
    const result = this.decorated.resolve(value);
    const elapsedMs = performance.now() - startTime;
    this.totalResolveTimeMs += elapsedMs;
    return result;
  }

  getResolveCount(): number {
    return this.resolveCount;
  }

  getAverageResolveTimeMs(): number {
    if (this.resolveCount === 0) return 0;
    return this.totalResolveTimeMs / this.resolveCount;
  }

  resetMetrics(): void {
    this.resolveCount = 0;
    this.totalResolveTimeMs = 0;
  }
}

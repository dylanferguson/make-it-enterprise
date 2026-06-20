import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export class CachingValueResolverDecorator implements ICompositeValueResolver {
  private readonly decorated: ICompositeValueResolver;
  private readonly cache: Map<number, string> = new Map();

  constructor(decorated: ICompositeValueResolver) {
    this.decorated = decorated;
  }

  resolve(value: number): string {
    const cached = this.cache.get(value);
    if (cached !== undefined) {
      return cached;
    }
    const result = this.decorated.resolve(value);
    this.cache.set(value, result);
    return result;
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

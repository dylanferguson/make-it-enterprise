import type { IFizzBuzzStrategyFlyweightFactory } from "../contracts/IFizzBuzzStrategyFlyweightFactory.js";
import type { IFizzBuzzStrategy } from "../contracts/IFizzBuzzStrategy.js";

export abstract class AbstractBaseFizzBuzzStrategyFlyweightFactory
  implements IFizzBuzzStrategyFlyweightFactory
{
  protected readonly strategyCache: Map<string, IFizzBuzzStrategy> = new Map();
  protected readonly factoryName: string;
  protected hitCount: number = 0;
  protected missCount: number = 0;

  constructor(factoryName: string = "DefaultFizzBuzzStrategyFlyweightFactory") {
    this.factoryName = factoryName;
  }

  abstract getFlyweightFactoryName(): string;

  getStrategy(key: string): IFizzBuzzStrategy | null {
    const cached = this.strategyCache.get(key);
    if (cached !== undefined) {
      this.hitCount++;
      return cached;
    }
    this.missCount++;
    return null;
  }

  registerStrategy(key: string, strategy: IFizzBuzzStrategy): void {
    if (this.strategyCache.has(key)) {
      console.debug(`[${this.factoryName}] Overwriting cached strategy for key: ${key}`);
    }
    this.strategyCache.set(key, strategy);
  }

  getOrCreateStrategy(key: string, factory: () => IFizzBuzzStrategy): IFizzBuzzStrategy {
    const existing = this.getStrategy(key);
    if (existing !== null) {
      return existing;
    }
    const created = factory();
    this.strategyCache.set(key, created);
    return created;
  }

  clearCache(): void {
    this.strategyCache.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }

  getCacheSize(): number {
    return this.strategyCache.size;
  }

  getHitCount(): number {
    return this.hitCount;
  }

  getMissCount(): number {
    return this.missCount;
  }

  protected logCacheStats(): void {
    const total = this.hitCount + this.missCount;
    const hitRate = total > 0 ? ((this.hitCount / total) * 100).toFixed(2) : "0.00";
    console.debug(
      `[${this.factoryName}] Cache stats: ${this.hitCount} hits, ${this.missCount} misses (hit rate: ${hitRate}%)`,
    );
  }
}

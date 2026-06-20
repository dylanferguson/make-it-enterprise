import type { ICacheWarmupStrategy } from "../contracts/index.js";
import { PrecomputedDivisibilityCacheWarmupStrategyImpl } from "../impl/warmup/PrecomputedDivisibilityCacheWarmupStrategyImpl.js";

export class CacheWarmupStrategyFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CacheWarmupStrategyFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-WARMUP-STRATEGY-FACTORY";

  private static warmupSingleton: PrecomputedDivisibilityCacheWarmupStrategyImpl | null = null;

  static createWarmupStrategy(): PrecomputedDivisibilityCacheWarmupStrategyImpl {
    if (CacheWarmupStrategyFactoryBeanFactory.warmupSingleton === null) {
      CacheWarmupStrategyFactoryBeanFactory.warmupSingleton = new PrecomputedDivisibilityCacheWarmupStrategyImpl();
    }
    return CacheWarmupStrategyFactoryBeanFactory.warmupSingleton!;
  }

  static getWarmupStrategy(): ICacheWarmupStrategy | null { return CacheWarmupStrategyFactoryBeanFactory.warmupSingleton; }

  static getFactoryBeanName(): string { return CacheWarmupStrategyFactoryBeanFactory.FACTORY_BEAN_NAME; }
  static getFactoryBeanVersion(): string { return CacheWarmupStrategyFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}

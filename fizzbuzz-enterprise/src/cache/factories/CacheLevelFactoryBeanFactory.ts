import type { ICacheLevel } from "../contracts/index.js";
import { L1InMemoryCacheLevelImpl } from "../impl/levels/L1InMemoryCacheLevelImpl.js";
import { L2InMemoryCacheLevelImpl } from "../impl/levels/L2InMemoryCacheLevelImpl.js";
import { CacheEvictionPolicyFactoryBeanFactory } from "./CacheEvictionPolicyFactoryBeanFactory.js";

export class CacheLevelFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CacheLevelFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CACHE-LEVEL-FACTORY";

  private static l1Singleton: L1InMemoryCacheLevelImpl | null = null;
  private static l2Singleton: L2InMemoryCacheLevelImpl | null = null;

  static createL1CacheLevel(): L1InMemoryCacheLevelImpl {
    if (CacheLevelFactoryBeanFactory.l1Singleton === null) {
      const compositePolicy = CacheEvictionPolicyFactoryBeanFactory.createCompositePolicy();
      CacheLevelFactoryBeanFactory.l1Singleton = new L1InMemoryCacheLevelImpl(compositePolicy);
    }
    return CacheLevelFactoryBeanFactory.l1Singleton!;
  }

  static createL2CacheLevel(ttlOverrideMs?: number): L2InMemoryCacheLevelImpl {
    if (CacheLevelFactoryBeanFactory.l2Singleton === null) {
      const lruPolicy = CacheEvictionPolicyFactoryBeanFactory.createLruPolicy();
      CacheLevelFactoryBeanFactory.l2Singleton = new L2InMemoryCacheLevelImpl(lruPolicy, ttlOverrideMs);
    }
    return CacheLevelFactoryBeanFactory.l2Singleton!;
  }

  static getL1Level(): ICacheLevel<boolean> | null { return CacheLevelFactoryBeanFactory.l1Singleton; }
  static getL2Level(): ICacheLevel<boolean> | null { return CacheLevelFactoryBeanFactory.l2Singleton; }

  static getFactoryBeanName(): string { return CacheLevelFactoryBeanFactory.FACTORY_BEAN_NAME; }
  static getFactoryBeanVersion(): string { return CacheLevelFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}

import type { ICacheEvictionPolicy } from "../contracts/index.js";
import { LruCacheEvictionPolicyImpl } from "../impl/policies/LruCacheEvictionPolicyImpl.js";
import { TtlCacheEvictionPolicyImpl } from "../impl/policies/TtlCacheEvictionPolicyImpl.js";
import { CompositeEvictionPolicyImpl } from "../impl/policies/CompositeEvictionPolicyImpl.js";

export class CacheEvictionPolicyFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CacheEvictionPolicyFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-EVICTION-POLICY-FACTORY";

  private static lruPolicySingleton: LruCacheEvictionPolicyImpl | null = null;
  private static ttlPolicySingleton: TtlCacheEvictionPolicyImpl | null = null;
  private static compositePolicySingleton: CompositeEvictionPolicyImpl | null = null;

  static createLruPolicy(): LruCacheEvictionPolicyImpl {
    if (CacheEvictionPolicyFactoryBeanFactory.lruPolicySingleton === null) {
      CacheEvictionPolicyFactoryBeanFactory.lruPolicySingleton = new LruCacheEvictionPolicyImpl();
    }
    return CacheEvictionPolicyFactoryBeanFactory.lruPolicySingleton!;
  }

  static createTtlPolicy(): TtlCacheEvictionPolicyImpl {
    if (CacheEvictionPolicyFactoryBeanFactory.ttlPolicySingleton === null) {
      CacheEvictionPolicyFactoryBeanFactory.ttlPolicySingleton = new TtlCacheEvictionPolicyImpl();
    }
    return CacheEvictionPolicyFactoryBeanFactory.ttlPolicySingleton!;
  }

  static createCompositePolicy(): CompositeEvictionPolicyImpl {
    if (CacheEvictionPolicyFactoryBeanFactory.compositePolicySingleton === null) {
      CacheEvictionPolicyFactoryBeanFactory.compositePolicySingleton = new CompositeEvictionPolicyImpl(
        CacheEvictionPolicyFactoryBeanFactory.createLruPolicy(),
        CacheEvictionPolicyFactoryBeanFactory.createTtlPolicy(),
      );
    }
    return CacheEvictionPolicyFactoryBeanFactory.compositePolicySingleton!;
  }

  static getLruPolicy(): ICacheEvictionPolicy | null { return CacheEvictionPolicyFactoryBeanFactory.lruPolicySingleton; }
  static getTtlPolicy(): ICacheEvictionPolicy | null { return CacheEvictionPolicyFactoryBeanFactory.ttlPolicySingleton; }
  static getCompositePolicy(): ICacheEvictionPolicy | null { return CacheEvictionPolicyFactoryBeanFactory.compositePolicySingleton; }

  static getFactoryBeanName(): string { return CacheEvictionPolicyFactoryBeanFactory.FACTORY_BEAN_NAME; }
  static getFactoryBeanVersion(): string { return CacheEvictionPolicyFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}

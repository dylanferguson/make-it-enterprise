import type { IEnterpriseComputationCacheManager } from "../contracts/index.js";
import { EnterpriseComputationCacheManagerImpl } from "../impl/manager/EnterpriseComputationCacheManagerImpl.js";
import { CacheLevelFactoryBeanFactory } from "./CacheLevelFactoryBeanFactory.js";
import { CacheClusterNodeFactoryBeanFactory } from "./CacheClusterNodeFactoryBeanFactory.js";
import { CacheCoherencyProtocolFactoryBeanFactory } from "./CacheCoherencyProtocolFactoryBeanFactory.js";
import { CacheWarmupStrategyFactoryBeanFactory } from "./CacheWarmupStrategyFactoryBeanFactory.js";
import { CacheMetricsCollectorFactoryBeanFactory } from "./CacheMetricsCollectorFactoryBeanFactory.js";

export class EnterpriseComputationCacheManagerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseComputationCacheManagerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CACHE-MANAGER-FACTORY";

  private static managerSingleton: EnterpriseComputationCacheManagerImpl | null = null;

  static initializeCacheInfrastructure(): EnterpriseComputationCacheManagerImpl {
    if (EnterpriseComputationCacheManagerFactoryBeanFactory.managerSingleton === null) {
      const l1 = CacheLevelFactoryBeanFactory.createL1CacheLevel();
      const l2 = CacheLevelFactoryBeanFactory.createL2CacheLevel();
      const node = CacheClusterNodeFactoryBeanFactory.createLocalNode();
      const topology = CacheClusterNodeFactoryBeanFactory.createSingleNodeTopology();
      const protocol = CacheCoherencyProtocolFactoryBeanFactory.createProtocol();
      const warmup = CacheWarmupStrategyFactoryBeanFactory.createWarmupStrategy();
      const metrics = CacheMetricsCollectorFactoryBeanFactory.createMetricsCollector();
      EnterpriseComputationCacheManagerFactoryBeanFactory.managerSingleton =
        new EnterpriseComputationCacheManagerImpl(l1, l2, node, topology, protocol, warmup, metrics);
      const warmedCount = EnterpriseComputationCacheManagerFactoryBeanFactory.managerSingleton.warmupAllCaches();
      EnterpriseComputationCacheManagerFactoryBeanFactory.managerSingleton.markInfrastructureReady();
      const m = EnterpriseComputationCacheManagerFactoryBeanFactory.managerSingleton;
      console.debug(
        `[${EnterpriseComputationCacheManagerFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseComputationCacheManagerFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Cache infrastructure initialized: ` +
        `l1=[${l1.getLevelDescriptor()}], ` +
        `l2=[${l2.getLevelDescriptor()}], ` +
        `topology=[${topology.getTopologyDescriptor()}], ` +
        `warmupEntries=[${warmedCount}], ` +
        `metrics=[${metrics.getAggregateMetricsDescriptor()}]`,
      );
    }
    return EnterpriseComputationCacheManagerFactoryBeanFactory.managerSingleton!;
  }

  static getCacheManager(): IEnterpriseComputationCacheManager | null {
    return EnterpriseComputationCacheManagerFactoryBeanFactory.managerSingleton;
  }

  static isCacheInfrastructureInitialized(): boolean {
    return EnterpriseComputationCacheManagerFactoryBeanFactory.managerSingleton !== null &&
      EnterpriseComputationCacheManagerFactoryBeanFactory.managerSingleton.isCacheInfrastructureReady();
  }

  static getFactoryBeanName(): string { return EnterpriseComputationCacheManagerFactoryBeanFactory.FACTORY_BEAN_NAME; }
  static getFactoryBeanVersion(): string { return EnterpriseComputationCacheManagerFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}

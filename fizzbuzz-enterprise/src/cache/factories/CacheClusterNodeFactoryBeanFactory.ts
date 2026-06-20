import type { ICacheClusterNode } from "../contracts/index.js";
import { LocalCacheClusterNodeImpl } from "../impl/cluster/LocalCacheClusterNodeImpl.js";
import { SingleNodeClusterTopologyImpl } from "../impl/cluster/SingleNodeClusterTopologyImpl.js";
import type { ICacheClusterTopology } from "../contracts/index.js";

export class CacheClusterNodeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CacheClusterNodeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CLUSTER-NODE-FACTORY";

  private static nodeSingleton: LocalCacheClusterNodeImpl | null = null;
  private static topologySingleton: SingleNodeClusterTopologyImpl | null = null;

  static createLocalNode(): LocalCacheClusterNodeImpl {
    if (CacheClusterNodeFactoryBeanFactory.nodeSingleton === null) {
      CacheClusterNodeFactoryBeanFactory.nodeSingleton = new LocalCacheClusterNodeImpl();
    }
    return CacheClusterNodeFactoryBeanFactory.nodeSingleton!;
  }

  static createSingleNodeTopology(): SingleNodeClusterTopologyImpl {
    if (CacheClusterNodeFactoryBeanFactory.topologySingleton === null) {
      const node = CacheClusterNodeFactoryBeanFactory.createLocalNode();
      CacheClusterNodeFactoryBeanFactory.topologySingleton = new SingleNodeClusterTopologyImpl(node);
    }
    return CacheClusterNodeFactoryBeanFactory.topologySingleton!;
  }

  static getNode(): ICacheClusterNode | null { return CacheClusterNodeFactoryBeanFactory.nodeSingleton; }
  static getTopology(): ICacheClusterTopology | null { return CacheClusterNodeFactoryBeanFactory.topologySingleton; }

  static getFactoryBeanName(): string { return CacheClusterNodeFactoryBeanFactory.FACTORY_BEAN_NAME; }
  static getFactoryBeanVersion(): string { return CacheClusterNodeFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}

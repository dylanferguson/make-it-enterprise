import type { ICacheMetricsCollector } from "../contracts/index.js";
import { StandardCacheMetricsCollectorImpl } from "../impl/metrics/StandardCacheMetricsCollectorImpl.js";

export class CacheMetricsCollectorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CacheMetricsCollectorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-METRICS-COLLECTOR-FACTORY";

  private static metricsSingleton: StandardCacheMetricsCollectorImpl | null = null;

  static createMetricsCollector(): StandardCacheMetricsCollectorImpl {
    if (CacheMetricsCollectorFactoryBeanFactory.metricsSingleton === null) {
      CacheMetricsCollectorFactoryBeanFactory.metricsSingleton = new StandardCacheMetricsCollectorImpl();
    }
    return CacheMetricsCollectorFactoryBeanFactory.metricsSingleton!;
  }

  static getMetricsCollector(): ICacheMetricsCollector | null { return CacheMetricsCollectorFactoryBeanFactory.metricsSingleton; }

  static getFactoryBeanName(): string { return CacheMetricsCollectorFactoryBeanFactory.FACTORY_BEAN_NAME; }
  static getFactoryBeanVersion(): string { return CacheMetricsCollectorFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}

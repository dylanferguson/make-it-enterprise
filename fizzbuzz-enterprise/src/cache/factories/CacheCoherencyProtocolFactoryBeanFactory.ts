import type { ICacheCoherencyProtocol } from "../contracts/index.js";
import { PassThroughCacheCoherencyProtocolImpl } from "../impl/protocols/PassThroughCacheCoherencyProtocolImpl.js";
import { CacheLevelFactoryBeanFactory } from "./CacheLevelFactoryBeanFactory.js";

export class CacheCoherencyProtocolFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CacheCoherencyProtocolFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-COHERENCY-PROTOCOL-FACTORY";

  private static protocolSingleton: PassThroughCacheCoherencyProtocolImpl | null = null;

  static createProtocol(): PassThroughCacheCoherencyProtocolImpl {
    if (CacheCoherencyProtocolFactoryBeanFactory.protocolSingleton === null) {
      CacheCoherencyProtocolFactoryBeanFactory.protocolSingleton = new PassThroughCacheCoherencyProtocolImpl();
    }
    return CacheCoherencyProtocolFactoryBeanFactory.protocolSingleton!;
  }

  static getProtocol(): ICacheCoherencyProtocol | null { return CacheCoherencyProtocolFactoryBeanFactory.protocolSingleton; }

  static getFactoryBeanName(): string { return CacheCoherencyProtocolFactoryBeanFactory.FACTORY_BEAN_NAME; }
  static getFactoryBeanVersion(): string { return CacheCoherencyProtocolFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}

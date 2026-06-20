import type { IEnterpriseDivisibilityExpressionEvaluatorRegistry } from "../contracts/index.js";
import { DefaultEnterpriseDivisibilityExpressionEvaluatorRegistryImpl } from "../impl/registry/DefaultEnterpriseDivisibilityExpressionEvaluatorRegistryImpl.js";
import { CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory } from "../../cache/factories/CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.js";

export class EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN-REGISTRY-FACTORY";

  private static registrySingleton: IEnterpriseDivisibilityExpressionEvaluatorRegistry | null = null;
  private static initializerCount: number = 0;

  static createRegistry(): IEnterpriseDivisibilityExpressionEvaluatorRegistry {
    if (EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton === null) {
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton =
        new DefaultEnterpriseDivisibilityExpressionEvaluatorRegistryImpl();
      const cacheAwareEvaluator = CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.createCachedEvaluator();
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton.registerEvaluator(cacheAwareEvaluator);
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.initializerCount++;
      const reg = EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton!;
      console.debug(
        `[${EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Registry initialized with ${reg.getEvaluatorCount()} evaluator(s): ` +
        `decoratedEvaluator=[${cacheAwareEvaluator.getDecoratorName()} v${cacheAwareEvaluator.getDecoratorVersion()}], ` +
        `delegate=[${cacheAwareEvaluator.getDelegatingEvaluatorName()}]`,
      );
    }
    return EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton!;
  }

  static getRegistry(): IEnterpriseDivisibilityExpressionEvaluatorRegistry | null {
    return EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton;
  }

  static resetRegistry(): void {
    if (EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton !== null) {
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton.clearRegistry();
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton = null;
    }
    EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.initializerCount = 0;
  }

  static getFactoryBeanName(): string {
    return EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static getInitializationCount(): number {
    return EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.initializerCount;
  }
}

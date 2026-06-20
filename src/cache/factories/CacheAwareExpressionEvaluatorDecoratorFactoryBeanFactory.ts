import type { IEnterpriseDivisibilityExpressionEvaluator } from "../../expressionengine/contracts/index.js";
import { ModuloOperatorDivisibilityExpressionEvaluatorImpl } from "../../expressionengine/impl/evaluators/ModuloOperatorDivisibilityExpressionEvaluatorImpl.js";
import { CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl } from "../impl/decorators/CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.js";
import { EnterpriseComputationCacheManagerFactoryBeanFactory } from "./EnterpriseComputationCacheManagerFactoryBeanFactory.js";

export class CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DECORATOR-FACTORY";

  private static decoratorSingleton: CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl | null = null;

  static createCachedEvaluator(): CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl {
    if (CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.decoratorSingleton === null) {
      const moduloEvaluator = new ModuloOperatorDivisibilityExpressionEvaluatorImpl();
      const cacheManager = EnterpriseComputationCacheManagerFactoryBeanFactory.initializeCacheInfrastructure();
      CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.decoratorSingleton =
        new CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl(moduloEvaluator, cacheManager);
      const d = CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.decoratorSingleton;
      console.debug(
        `[${CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Cache-aware expression evaluator decorator initialized: ` +
        `decorator=[${d.getDecoratorName()} v${d.getDecoratorVersion()}], ` +
        `delegate=[${d.getDelegatingEvaluatorName()}], ` +
        `cacheManager=[${cacheManager.getCacheManagerDescriptor()}]`,
      );
    }
    return CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.decoratorSingleton!;
  }

  static getCachedEvaluator(): CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl | null {
    return CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.decoratorSingleton;
  }

  static getFactoryBeanName(): string { return CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME; }
  static getFactoryBeanVersion(): string { return CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}

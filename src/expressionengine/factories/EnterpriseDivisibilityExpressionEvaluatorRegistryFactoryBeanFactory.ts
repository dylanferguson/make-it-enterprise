import type { IEnterpriseDivisibilityExpressionEvaluatorRegistry } from "../contracts/index.js";
import { DefaultEnterpriseDivisibilityExpressionEvaluatorRegistryImpl } from "../impl/registry/DefaultEnterpriseDivisibilityExpressionEvaluatorRegistryImpl.js";
import { ModuloOperatorDivisibilityExpressionEvaluatorImpl } from "../impl/evaluators/ModuloOperatorDivisibilityExpressionEvaluatorImpl.js";

export class EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN-REGISTRY-FACTORY";

  private static registrySingleton: IEnterpriseDivisibilityExpressionEvaluatorRegistry | null = null;
  private static initializerCount: number = 0;

  static createRegistry(): IEnterpriseDivisibilityExpressionEvaluatorRegistry {
    if (EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton === null) {
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton =
        new DefaultEnterpriseDivisibilityExpressionEvaluatorRegistryImpl();
      const moduloEvaluator = new ModuloOperatorDivisibilityExpressionEvaluatorImpl();
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton.registerEvaluator(moduloEvaluator);
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.initializerCount++;
      const reg = EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.registrySingleton!;
      console.debug(
        `[${EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Registry initialized with ${reg.getEvaluatorCount()} evaluator(s)`,
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

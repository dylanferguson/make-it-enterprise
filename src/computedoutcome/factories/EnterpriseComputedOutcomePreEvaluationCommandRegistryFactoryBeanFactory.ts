import { DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl } from "../impl/registry/DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl.js";

export class EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PRE-EVAL-REGISTRY-FACTORY-BEAN";

  private static registrySingleton: DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl | null = null;
  private static initialized = false;

  static createRegistry(): DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl {
    if (EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.initialized) {
      return EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.registrySingleton!;
    }
    const registry = new DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl();
    EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.registrySingleton = registry;
    EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.initialized = true;
    console.debug(
      `[${EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Pre-evaluation command registry created: [${registry.getRegistryName()} v${registry.getRegistryVersion()}]`,
    );
    return registry;
  }

  static getRegistry(): DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl | null {
    return EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.registrySingleton;
  }

  static isInitialized(): boolean {
    return EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.initialized;
  }

  static reset(): void {
    EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.registrySingleton = null;
    EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.initialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

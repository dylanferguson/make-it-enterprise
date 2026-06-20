import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy.js";
import { StandardEnterpriseDivisibilityEvaluationInterceptorAdapterImpl } from "../impl/StandardEnterpriseDivisibilityEvaluationInterceptorAdapterImpl.js";
import { StandardEnterpriseDivisibilityEvaluationInterceptorAdapterStrategyImpl } from "../impl/StandardEnterpriseDivisibilityEvaluationInterceptorAdapterStrategyImpl.js";

export class EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DIV-INTERCEPT-ADAPTER-FACTORY";

  private static adapterSingleton: IEnterpriseDivisibilityEvaluationInterceptorAdapter | null = null;
  private static infrastructureInitialized = false;

  static initializeAdapterInfrastructure(): IEnterpriseDivisibilityEvaluationInterceptorAdapter {
    if (EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.infrastructureInitialized) {
      return EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.adapterSingleton!;
    }
    const adapter = new StandardEnterpriseDivisibilityEvaluationInterceptorAdapterImpl();
    const threeStrategy = new StandardEnterpriseDivisibilityEvaluationInterceptorAdapterStrategyImpl(3);
    const fiveStrategy = new StandardEnterpriseDivisibilityEvaluationInterceptorAdapterStrategyImpl(5);
    adapter.registerInterceptorAdapterStrategy(3, threeStrategy);
    adapter.registerInterceptorAdapterStrategy(5, fiveStrategy);
    EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.adapterSingleton = adapter;
    EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.infrastructureInitialized = true;
    console.debug(
      `[${EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Enterprise divisibility evaluation interceptor adapter infrastructure initialized: ` +
      `adapter=[${adapter.getAdapterName()} v${adapter.getAdapterVersion()}], ` +
      `registeredDivisors=[${adapter.getRegisteredDivisors().join(", ")}], ` +
      `strategyCount=[${adapter.getRegisteredDivisors().length}]`,
    );
    return adapter;
  }

  static getAdapter(): IEnterpriseDivisibilityEvaluationInterceptorAdapter | null {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.adapterSingleton;
  }

  static isInfrastructureInitialized(): boolean {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.infrastructureInitialized;
  }

  static resetInfrastructure(): void {
    EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.adapterSingleton = null;
    EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.infrastructureInitialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

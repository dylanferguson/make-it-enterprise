import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer.js";
import { StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl } from "../impl/StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl.js";

export class EnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DIV-INTERCEPT-CONFIGURER-FACTORY";

  private static configurerSingleton: IEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer | null = null;

  static createConfigurer(): IEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer {
    if (EnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerFactoryBeanFactory.configurerSingleton === null) {
      EnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerFactoryBeanFactory.configurerSingleton =
        new StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl();
    }
    return EnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerFactoryBeanFactory.configurerSingleton;
  }

  static getConfigurer(): IEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer | null {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerFactoryBeanFactory.configurerSingleton;
  }

  static resetConfigurer(): void {
    EnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerFactoryBeanFactory.configurerSingleton = null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

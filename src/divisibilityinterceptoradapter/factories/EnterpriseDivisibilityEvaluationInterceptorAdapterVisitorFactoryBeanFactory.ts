import { StandardEnterpriseDivisibilityEvaluationInterceptorAdapterVisitorImpl } from "../impl/StandardEnterpriseDivisibilityEvaluationInterceptorAdapterVisitorImpl.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor.js";

export class EnterpriseDivisibilityEvaluationInterceptorAdapterVisitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityEvaluationInterceptorAdapterVisitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DIV-INTERCEPT-VISITOR-FACTORY";

  private static visitorSingleton: IEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor | null = null;

  static createVisitor(): IEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor {
    if (EnterpriseDivisibilityEvaluationInterceptorAdapterVisitorFactoryBeanFactory.visitorSingleton === null) {
      EnterpriseDivisibilityEvaluationInterceptorAdapterVisitorFactoryBeanFactory.visitorSingleton =
        new StandardEnterpriseDivisibilityEvaluationInterceptorAdapterVisitorImpl();
    }
    return EnterpriseDivisibilityEvaluationInterceptorAdapterVisitorFactoryBeanFactory.visitorSingleton;
  }

  static getVisitor(): IEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor | null {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterVisitorFactoryBeanFactory.visitorSingleton;
  }

  static resetVisitor(): void {
    EnterpriseDivisibilityEvaluationInterceptorAdapterVisitorFactoryBeanFactory.visitorSingleton = null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterVisitorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterVisitorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

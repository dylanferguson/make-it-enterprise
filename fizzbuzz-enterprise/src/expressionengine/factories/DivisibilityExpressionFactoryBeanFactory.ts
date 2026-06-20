import type { IEnterpriseDivisibilityExpressionFactory } from "../contracts/index.js";
import { StandardDivisibilityExpressionFactoryImpl } from "../impl/factories/StandardDivisibilityExpressionFactoryImpl.js";

export class DivisibilityExpressionFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "DivisibilityExpressionFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN-EXPRESSION-FACTORY";

  private static factorySingleton: IEnterpriseDivisibilityExpressionFactory | null = null;

  static createFactory(): IEnterpriseDivisibilityExpressionFactory {
    if (DivisibilityExpressionFactoryBeanFactory.factorySingleton === null) {
      DivisibilityExpressionFactoryBeanFactory.factorySingleton = new StandardDivisibilityExpressionFactoryImpl();
      const instance = DivisibilityExpressionFactoryBeanFactory.factorySingleton;
      console.debug(
        `[${DivisibilityExpressionFactoryBeanFactory.FACTORY_BEAN_NAME} v${DivisibilityExpressionFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Expression factory initialized: [${instance.getFactoryName()} v${instance.getFactoryVersion()}]`,
      );
    }
    return DivisibilityExpressionFactoryBeanFactory.factorySingleton!;
  }

  static getFactory(): IEnterpriseDivisibilityExpressionFactory | null {
    return DivisibilityExpressionFactoryBeanFactory.factorySingleton;
  }

  static resetFactory(): void {
    DivisibilityExpressionFactoryBeanFactory.factorySingleton = null;
  }

  static getFactoryBeanName(): string {
    return DivisibilityExpressionFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return DivisibilityExpressionFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

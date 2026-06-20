import type { IEnterpriseDivisibilityExpressionInterpreter } from "../contracts/index.js";
import { EnterpriseDelegatingDivisibilityExpressionInterpreterImpl } from "../impl/interpreters/EnterpriseDelegatingDivisibilityExpressionInterpreterImpl.js";
import { EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory } from "./EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.js";

export class EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN-INTERPRETER-FACTORY";

  private static interpreterSingleton: IEnterpriseDivisibilityExpressionInterpreter | null = null;

  static createInterpreter(): IEnterpriseDivisibilityExpressionInterpreter {
    if (EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.interpreterSingleton === null) {
      const registry = EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.createRegistry();
      EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.interpreterSingleton =
        new EnterpriseDelegatingDivisibilityExpressionInterpreterImpl(registry);
      const interpreter = EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.interpreterSingleton!;
      console.debug(
        `[${EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Interpreter initialized: [${interpreter.getInterpreterName()} v${interpreter.getInterpreterVersion()}]`,
      );
    }
    return EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.interpreterSingleton!;
  }

  static getInterpreter(): IEnterpriseDivisibilityExpressionInterpreter | null {
    return EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.interpreterSingleton;
  }

  static resetInterpreter(): void {
    EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.interpreterSingleton = null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

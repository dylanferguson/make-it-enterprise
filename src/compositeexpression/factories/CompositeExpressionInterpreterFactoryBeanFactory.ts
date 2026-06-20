import type { ICompositeDivisibilityExpressionInterpreter, ICompositeDivisibilityExpressionVisitor } from "../contracts/index.js";
import { CompositeDivisibilityExpressionInterpreterImpl } from "../impl/interpreters/CompositeDivisibilityExpressionInterpreterImpl.js";

export class CompositeExpressionInterpreterFactoryBeanFactory {
  private static readonly FACTORY_NAME = "CompositeExpressionInterpreterFactoryBeanFactory";
  private static readonly FACTORY_VERSION = "1.0.0-FBF-INTERPRETER";
  private static interpreter: ICompositeDivisibilityExpressionInterpreter | null = null;
  private static factoryBeanInitialized = false;

  static initializeFactoryBeanInfrastructure(): void {
    if (!CompositeExpressionInterpreterFactoryBeanFactory.factoryBeanInitialized) {
      CompositeExpressionInterpreterFactoryBeanFactory.factoryBeanInitialized = true;
    }
  }

  static createInterpreter(
    visitor: ICompositeDivisibilityExpressionVisitor,
  ): ICompositeDivisibilityExpressionInterpreter {
    CompositeExpressionInterpreterFactoryBeanFactory.initializeFactoryBeanInfrastructure();
    const interpreter = new CompositeDivisibilityExpressionInterpreterImpl(visitor);
    CompositeExpressionInterpreterFactoryBeanFactory.interpreter = interpreter;
    return interpreter;
  }

  static getInterpreter(): ICompositeDivisibilityExpressionInterpreter | null {
    return CompositeExpressionInterpreterFactoryBeanFactory.interpreter;
  }

  static reset(): void {
    CompositeExpressionInterpreterFactoryBeanFactory.interpreter = null;
    CompositeExpressionInterpreterFactoryBeanFactory.factoryBeanInitialized = false;
  }

  static getFactoryBeanName(): string {
    return CompositeExpressionInterpreterFactoryBeanFactory.FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return CompositeExpressionInterpreterFactoryBeanFactory.FACTORY_VERSION;
  }

  static isFactoryBeanInitialized(): boolean {
    return CompositeExpressionInterpreterFactoryBeanFactory.factoryBeanInitialized;
  }
}

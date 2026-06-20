import type { ICompositeDivisibilityExpressionVisitor } from "../contracts/index.js";
import { CompositeDivisibilityExpressionTraversalVisitorImpl } from "../impl/visitors/CompositeDivisibilityExpressionTraversalVisitorImpl.js";

export class CompositeExpressionVisitorFactoryBeanFactory {
  private static readonly FACTORY_NAME = "CompositeExpressionVisitorFactoryBeanFactory";
  private static readonly FACTORY_VERSION = "1.0.0-FBF-VISITOR";
  private static visitor: ICompositeDivisibilityExpressionVisitor | null = null;
  private static factoryBeanInitialized = false;

  static initializeFactoryBeanInfrastructure(): void {
    if (!CompositeExpressionVisitorFactoryBeanFactory.factoryBeanInitialized) {
      const visitor = new CompositeDivisibilityExpressionTraversalVisitorImpl();
      CompositeExpressionVisitorFactoryBeanFactory.visitor = visitor;
      CompositeExpressionVisitorFactoryBeanFactory.factoryBeanInitialized = true;
    }
  }

  static createVisitor(): ICompositeDivisibilityExpressionVisitor {
    CompositeExpressionVisitorFactoryBeanFactory.initializeFactoryBeanInfrastructure();
    return CompositeExpressionVisitorFactoryBeanFactory.visitor!;
  }

  static getVisitor(): ICompositeDivisibilityExpressionVisitor | null {
    return CompositeExpressionVisitorFactoryBeanFactory.visitor;
  }

  static reset(): void {
    CompositeExpressionVisitorFactoryBeanFactory.visitor = null;
    CompositeExpressionVisitorFactoryBeanFactory.factoryBeanInitialized = false;
  }

  static getFactoryBeanName(): string {
    return CompositeExpressionVisitorFactoryBeanFactory.FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return CompositeExpressionVisitorFactoryBeanFactory.FACTORY_VERSION;
  }

  static isFactoryBeanInitialized(): boolean {
    return CompositeExpressionVisitorFactoryBeanFactory.factoryBeanInitialized;
  }
}

import type { ICompositeExpressionTreeFactory } from "../contracts/index.js";
import { StandardCompositeExpressionTreeFactoryImpl } from "../impl/StandardCompositeExpressionTreeFactoryImpl.js";

export class CompositeExpressionTreeFactoryBeanFactory {
  private static readonly FACTORY_NAME = "CompositeExpressionTreeFactoryBeanFactory";
  private static readonly FACTORY_VERSION = "1.0.0-FBF-TREE-FACTORY";
  private static treeFactory: ICompositeExpressionTreeFactory | null = null;
  private static factoryBeanInitialized = false;

  static initializeFactoryBeanInfrastructure(): void {
    if (!CompositeExpressionTreeFactoryBeanFactory.factoryBeanInitialized) {
      CompositeExpressionTreeFactoryBeanFactory.treeFactory = new StandardCompositeExpressionTreeFactoryImpl();
      CompositeExpressionTreeFactoryBeanFactory.factoryBeanInitialized = true;
    }
  }

  static createTreeFactory(): ICompositeExpressionTreeFactory {
    CompositeExpressionTreeFactoryBeanFactory.initializeFactoryBeanInfrastructure();
    return CompositeExpressionTreeFactoryBeanFactory.treeFactory!;
  }

  static getTreeFactory(): ICompositeExpressionTreeFactory | null {
    return CompositeExpressionTreeFactoryBeanFactory.treeFactory;
  }

  static reset(): void {
    CompositeExpressionTreeFactoryBeanFactory.treeFactory = null;
    CompositeExpressionTreeFactoryBeanFactory.factoryBeanInitialized = false;
  }

  static getFactoryBeanName(): string {
    return CompositeExpressionTreeFactoryBeanFactory.FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return CompositeExpressionTreeFactoryBeanFactory.FACTORY_VERSION;
  }

  static isFactoryBeanInitialized(): boolean {
    return CompositeExpressionTreeFactoryBeanFactory.factoryBeanInitialized;
  }
}

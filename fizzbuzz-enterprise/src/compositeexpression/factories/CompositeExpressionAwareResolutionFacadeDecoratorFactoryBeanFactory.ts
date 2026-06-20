import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { ICompositeExpressionAwareResolutionFacadeDecorator } from "../contracts/ICompositeExpressionAwareResolutionFacadeDecorator.js";
import type { ICompositeDivisibilityExpressionInterpreter, ICompositeExpressionTreeFactory } from "../contracts/index.js";
import { CompositeExpressionAwareResolutionFacadeDecoratorImpl } from "../impl/decorators/CompositeExpressionAwareResolutionFacadeDecoratorImpl.js";

export class CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_NAME = "CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_VERSION = "1.0.0-FBF-CEARFD";
  private static decorator: ICompositeExpressionAwareResolutionFacadeDecorator | null = null;
  private static factoryBeanInitialized = false;

  static initializeFactoryBeanInfrastructure(): void {
    CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory.factoryBeanInitialized = true;
  }

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    interpreter: ICompositeDivisibilityExpressionInterpreter,
    treeFactory: ICompositeExpressionTreeFactory,
    enabled: boolean = true,
  ): ICompositeExpressionAwareResolutionFacadeDecorator {
    CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory.initializeFactoryBeanInfrastructure();
    const decorator = new CompositeExpressionAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      interpreter,
      treeFactory,
    );
    CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory.decorator = decorator;
    return decorator;
  }

  static getDecorator(): ICompositeExpressionAwareResolutionFacadeDecorator | null {
    return CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory.decorator;
  }

  static reset(): void {
    CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory.decorator = null;
    CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory.factoryBeanInitialized = false;
  }

  static getFactoryBeanName(): string {
    return CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_VERSION;
  }

  static isFactoryBeanInitialized(): boolean {
    return CompositeExpressionAwareResolutionFacadeDecoratorFactoryBeanFactory.factoryBeanInitialized;
  }
}

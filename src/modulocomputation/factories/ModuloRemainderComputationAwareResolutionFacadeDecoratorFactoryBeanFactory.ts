import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IModuloRemainderComputationAwareResolutionFacadeDecorator } from "../contracts/IModuloRemainderComputationAwareResolutionFacadeDecorator.js";
import type { IModuloRemainderComputationChainOfResponsibilityHandler, IModuloRemainderComputationCommandInvoker, IModuloRemainderComputationVisitor, IModuloRemainderComputationStrategyProvider } from "../contracts/index.js";
import { ModuloRemainderComputationAwareResolutionFacadeDecoratorImpl } from "../impl/decorators/ModuloRemainderComputationAwareResolutionFacadeDecoratorImpl.js";

export class ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_NAME = "ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_VERSION = "1.0.0-FBF-MRC-DECORATOR";
  private static decorator: IModuloRemainderComputationAwareResolutionFacadeDecorator | null = null;
  private static factoryBeanInitialized = false;

  static initializeFactoryBeanInfrastructure(): void {
    ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory.factoryBeanInitialized = true;
  }

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    chainHandler: IModuloRemainderComputationChainOfResponsibilityHandler,
    commandInvoker: IModuloRemainderComputationCommandInvoker,
    computationVisitor: IModuloRemainderComputationVisitor,
    strategyProvider: IModuloRemainderComputationStrategyProvider,
    registeredDivisors: readonly number[],
  ): IModuloRemainderComputationAwareResolutionFacadeDecorator {
    ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory.initializeFactoryBeanInfrastructure();
    const decorator = new ModuloRemainderComputationAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      chainHandler,
      commandInvoker,
      computationVisitor,
      strategyProvider,
      registeredDivisors,
    );
    ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory.decorator = decorator;
    return decorator;
  }

  static getDecorator(): IModuloRemainderComputationAwareResolutionFacadeDecorator | null {
    return ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory.decorator;
  }

  static reset(): void {
    ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory.decorator = null;
    ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory.factoryBeanInitialized = false;
  }

  static getFactoryBeanName(): string {
    return ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_VERSION;
  }

  static isFactoryBeanInitialized(): boolean {
    return ModuloRemainderComputationAwareResolutionFacadeDecoratorFactoryBeanFactory.factoryBeanInitialized;
  }
}

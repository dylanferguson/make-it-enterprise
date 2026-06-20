import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator } from "../contracts/IComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator.js";
import type { IEnterpriseComputationResolutionMediatorArchitecture } from "../contracts/IEnterpriseComputationResolutionMediatorArchitecture.js";
import { ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorImpl } from "../impl/ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorImpl.js";

export class ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DECORATOR-FACTORY";
  private static activeDecorator: IComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator | null = null;

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    architecture: IEnterpriseComputationResolutionMediatorArchitecture,
    enabled: boolean = true,
  ): IComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator {
    const decorator = new ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      architecture,
      enabled,
    );
    this.activeDecorator = decorator;
    return decorator;
  }

  static getActiveDecorator(): IComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator | null {
    return this.activeDecorator;
  }

  static resetDecorator(): void {
    this.activeDecorator = null;
  }

  static getFactoryBeanName(): string {
    return this.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return this.FACTORY_BEAN_VERSION;
  }
}

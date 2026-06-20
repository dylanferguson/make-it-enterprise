import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationStateMachineAwareResolutionFacadeDecorator } from "../contracts/IComputationStateMachineAwareResolutionFacadeDecorator.js";
import type { IComputationStateMachine } from "../contracts/IComputationStateMachine.js";
import type { IComputationStateMachineMediator } from "../contracts/IComputationStateMachineMediator.js";
import type { IComputationStateTransitionVisitor } from "../contracts/IComputationStateTransitionVisitor.js";
import { ComputationStateMachineAwareResolutionFacadeDecoratorImpl } from "../impl/facade/ComputationStateMachineAwareResolutionFacadeDecoratorImpl.js";
import { ComputationStateMachineFactoryBeanFactory } from "./ComputationStateMachineFactoryBeanFactory.js";
import { ComputationStateMachineMediatorFactoryBeanFactory } from "./ComputationStateMachineMediatorFactoryBeanFactory.js";
import { ComputationStateTransitionVisitorFactoryBeanFactory } from "./ComputationStateTransitionVisitorFactoryBeanFactory.js";

export class ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DECORATOR-FACTORY";

  private static decoratorSingleton: IComputationStateMachineAwareResolutionFacadeDecorator | null = null;

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    slaThresholdMs: number = 50,
  ): IComputationStateMachineAwareResolutionFacadeDecorator {
    if (ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton === null) {
      const stateMachine: IComputationStateMachine =
        ComputationStateMachineFactoryBeanFactory.createStateMachine();
      const mediator: IComputationStateMachineMediator =
        ComputationStateMachineMediatorFactoryBeanFactory.createMediator();
      const visitor: IComputationStateTransitionVisitor | null =
        ComputationStateTransitionVisitorFactoryBeanFactory.createVisitor();

      ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton =
        new ComputationStateMachineAwareResolutionFacadeDecoratorImpl(
          wrappedFacade,
          stateMachine,
          mediator,
          visitor,
          slaThresholdMs,
        );
    }
    return ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton!;
  }

  static getDecorator(): IComputationStateMachineAwareResolutionFacadeDecorator | null {
    return ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton;
  }

  static resetDecorator(): void {
    ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton = null;
  }

  static isInitialized(): boolean {
    return ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton !== null;
  }

  static getFactoryBeanName(): string {
    return ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

import type { IComputationStateMachineMediator } from "../contracts/IComputationStateMachineMediator.js";
import { StandardComputationStateMachineMediatorImpl } from "../impl/mediator/StandardComputationStateMachineMediatorImpl.js";

export class ComputationStateMachineMediatorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationStateMachineMediatorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MEDIATOR-FACTORY";

  private static mediatorSingleton: IComputationStateMachineMediator | null = null;

  static createMediator(): IComputationStateMachineMediator {
    if (ComputationStateMachineMediatorFactoryBeanFactory.mediatorSingleton === null) {
      ComputationStateMachineMediatorFactoryBeanFactory.mediatorSingleton =
        new StandardComputationStateMachineMediatorImpl();
    }
    return ComputationStateMachineMediatorFactoryBeanFactory.mediatorSingleton;
  }

  static getMediator(): IComputationStateMachineMediator | null {
    return ComputationStateMachineMediatorFactoryBeanFactory.mediatorSingleton;
  }

  static resetMediator(): void {
    ComputationStateMachineMediatorFactoryBeanFactory.mediatorSingleton = null;
  }

  static isInitialized(): boolean {
    return ComputationStateMachineMediatorFactoryBeanFactory.mediatorSingleton !== null;
  }

  static getFactoryBeanName(): string {
    return ComputationStateMachineMediatorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationStateMachineMediatorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

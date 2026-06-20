import { ComputationStateFactoryBeanFactory } from "./ComputationStateFactoryBeanFactory.js";
import { ComputationStateMachineFactoryBeanFactory } from "./ComputationStateMachineFactoryBeanFactory.js";
import { ComputationStateMachineMediatorFactoryBeanFactory } from "./ComputationStateMachineMediatorFactoryBeanFactory.js";
import { ComputationStateTransitionVisitorFactoryBeanFactory } from "./ComputationStateTransitionVisitorFactoryBeanFactory.js";

export class ComputationStateInfrastructureInitializerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationStateInfrastructureInitializerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-INITIALIZER-FACTORY";

  private static infrastructureInitialized = false;

  static initializeInfrastructure(): boolean {
    if (ComputationStateInfrastructureInitializerFactoryBeanFactory.infrastructureInitialized) {
      return true;
    }

    ComputationStateFactoryBeanFactory.createAllStates();
    ComputationStateMachineFactoryBeanFactory.createStateMachine();
    ComputationStateMachineMediatorFactoryBeanFactory.createMediator();
    ComputationStateTransitionVisitorFactoryBeanFactory.createVisitor();

    ComputationStateInfrastructureInitializerFactoryBeanFactory.infrastructureInitialized = true;
    return true;
  }

  static isInfrastructureInitialized(): boolean {
    return ComputationStateInfrastructureInitializerFactoryBeanFactory.infrastructureInitialized;
  }

  static resetInfrastructure(): void {
    ComputationStateMachineFactoryBeanFactory.resetStateMachine();
    ComputationStateMachineMediatorFactoryBeanFactory.resetMediator();
    ComputationStateTransitionVisitorFactoryBeanFactory.resetVisitor();
    ComputationStateInfrastructureInitializerFactoryBeanFactory.infrastructureInitialized = false;
  }

  static getFactoryBeanName(): string {
    return ComputationStateInfrastructureInitializerFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationStateInfrastructureInitializerFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

import type { IComputationStateMachine } from "../contracts/IComputationStateMachine.js";
import { ComputationStateFactoryBeanFactory } from "./ComputationStateFactoryBeanFactory.js";
import { DefaultComputationStateMachineImpl } from "../impl/machines/DefaultComputationStateMachineImpl.js";

export class ComputationStateMachineFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationStateMachineFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MACHINE-FACTORY";

  private static machineSingleton: IComputationStateMachine | null = null;

  static createStateMachine(): IComputationStateMachine {
    if (ComputationStateMachineFactoryBeanFactory.machineSingleton === null) {
      const states = ComputationStateFactoryBeanFactory.createAllStates();
      const initialState = states[0]!;
      ComputationStateMachineFactoryBeanFactory.machineSingleton =
        new DefaultComputationStateMachineImpl(initialState, states);
    }
    return ComputationStateMachineFactoryBeanFactory.machineSingleton;
  }

  static getStateMachine(): IComputationStateMachine | null {
    return ComputationStateMachineFactoryBeanFactory.machineSingleton;
  }

  static resetStateMachine(): void {
    ComputationStateMachineFactoryBeanFactory.machineSingleton = null;
  }

  static isInitialized(): boolean {
    return ComputationStateMachineFactoryBeanFactory.machineSingleton !== null;
  }

  static getFactoryBeanName(): string {
    return ComputationStateMachineFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationStateMachineFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

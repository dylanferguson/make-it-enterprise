import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../contracts/index.js";
import type { IModularArithmeticExecutionStrategySelector } from "../contracts/index.js";
import { StandardEnterpriseFizzBuzzModularArithmeticExecutionCoordinatorImpl } from "../impl/services/StandardEnterpriseFizzBuzzModularArithmeticExecutionCoordinatorImpl.js";
import { DivisorBasedModularArithmeticExecutionStrategySelectorImpl } from "../impl/selectors/DivisorBasedModularArithmeticExecutionStrategySelectorImpl.js";

export class EnterpriseExecutionCoordinatorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseExecutionCoordinatorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-EXECUTION-COORDINATOR-FACTORY";

  private static coordinatorSingleton: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator | null = null;
  private static strategySelectorSingleton: IModularArithmeticExecutionStrategySelector | null = null;
  private static initialized = false;

  static createCoordinator(
    terminalResolutionDelegate: (value: number) => string,
  ): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator {
    if (EnterpriseExecutionCoordinatorFactoryBeanFactory.initialized) {
      return EnterpriseExecutionCoordinatorFactoryBeanFactory.coordinatorSingleton!;
    }
    const selector = EnterpriseExecutionCoordinatorFactoryBeanFactory.createStrategySelector();
    const coordinator = new StandardEnterpriseFizzBuzzModularArithmeticExecutionCoordinatorImpl(
      selector,
      terminalResolutionDelegate,
    );
    EnterpriseExecutionCoordinatorFactoryBeanFactory.coordinatorSingleton = coordinator;
    EnterpriseExecutionCoordinatorFactoryBeanFactory.initialized = true;

    console.debug(
      `[${EnterpriseExecutionCoordinatorFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseExecutionCoordinatorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Enterprise execution coordinator created: ` +
      `coordinator=[${coordinator.getCoordinatorName()} v${coordinator.getCoordinatorVersion()}], ` +
      `selector=[${selector.getSelectorName()} v${selector.getSelectorVersion()}], ` +
      `strategies=[${selector.getRegisteredStrategies().join(", ")}]`,
    );
    return coordinator;
  }

  static createStrategySelector(): IModularArithmeticExecutionStrategySelector {
    if (EnterpriseExecutionCoordinatorFactoryBeanFactory.strategySelectorSingleton !== null) {
      return EnterpriseExecutionCoordinatorFactoryBeanFactory.strategySelectorSingleton;
    }
    const selector = new DivisorBasedModularArithmeticExecutionStrategySelectorImpl();
    EnterpriseExecutionCoordinatorFactoryBeanFactory.strategySelectorSingleton = selector;
    return selector;
  }

  static getCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator | null {
    return EnterpriseExecutionCoordinatorFactoryBeanFactory.coordinatorSingleton;
  }

  static getStrategySelector(): IModularArithmeticExecutionStrategySelector | null {
    return EnterpriseExecutionCoordinatorFactoryBeanFactory.strategySelectorSingleton;
  }

  static isInitialized(): boolean {
    return EnterpriseExecutionCoordinatorFactoryBeanFactory.initialized;
  }

  static getFactoryBeanName(): string {
    return EnterpriseExecutionCoordinatorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseExecutionCoordinatorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactoryBean(): void {
    EnterpriseExecutionCoordinatorFactoryBeanFactory.coordinatorSingleton = null;
    EnterpriseExecutionCoordinatorFactoryBeanFactory.strategySelectorSingleton = null;
    EnterpriseExecutionCoordinatorFactoryBeanFactory.initialized = false;
  }
}

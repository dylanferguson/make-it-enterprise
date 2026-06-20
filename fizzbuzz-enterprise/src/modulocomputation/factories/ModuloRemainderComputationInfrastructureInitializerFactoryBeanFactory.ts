import type { IModuloRemainderComputationChainOfResponsibilityHandler, IModuloRemainderComputationCommandInvoker, IModuloRemainderComputationVisitor, IModuloRemainderComputationStrategyProvider } from "../contracts/index.js";
import { ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory } from "./ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.js";
import { ModuloRemainderComputationCommandFactoryBeanFactory } from "./ModuloRemainderComputationCommandFactoryBeanFactory.js";
import { ModuloRemainderComputationCommandInvokerFactoryBeanFactory } from "./ModuloRemainderComputationCommandInvokerFactoryBeanFactory.js";
import { ModuloRemainderComputationStrategyProviderFactoryBeanFactory } from "./ModuloRemainderComputationStrategyProviderFactoryBeanFactory.js";
import { ModuloRemainderComputationVisitorFactoryBeanFactory } from "./ModuloRemainderComputationVisitorFactoryBeanFactory.js";

export interface IModuloRemainderComputationInfrastructure {
  chainHandler: IModuloRemainderComputationChainOfResponsibilityHandler;
  commandInvoker: IModuloRemainderComputationCommandInvoker;
  computationVisitor: IModuloRemainderComputationVisitor;
  strategyProvider: IModuloRemainderComputationStrategyProvider;
  registeredDivisors: readonly number[];
}

export class ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MRC-INFRA-INIT";
  private static infrastructureInitialized = false;
  private static infrastructure: IModuloRemainderComputationInfrastructure | null = null;

  static initializeInfrastructure(
    divisors: readonly number[] = [3, 5],
    validationEnabled: boolean = true,
    slaMonitoringEnabled: boolean = true,
  ): IModuloRemainderComputationInfrastructure {
    if (ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory.infrastructureInitialized) {
      return ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory.infrastructure!;
    }

    ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.initializeChain(validationEnabled, slaMonitoringEnabled);
    const chainHandler = ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.getChainHead()!;

    ModuloRemainderComputationCommandFactoryBeanFactory.initializeFactory();
    ModuloRemainderComputationCommandFactoryBeanFactory.createDecoratedCommand();

    ModuloRemainderComputationCommandInvokerFactoryBeanFactory.initializeFactory();
    const commandInvoker = ModuloRemainderComputationCommandInvokerFactoryBeanFactory.createInvoker();
    const nativeCommand = ModuloRemainderComputationCommandFactoryBeanFactory.createNativeCommand();
    commandInvoker.registerCommand(nativeCommand);

    ModuloRemainderComputationStrategyProviderFactoryBeanFactory.initializeFactory();
    const strategyProvider = ModuloRemainderComputationStrategyProviderFactoryBeanFactory.createProvider();

    ModuloRemainderComputationVisitorFactoryBeanFactory.initializeFactory();
    const computationVisitor = ModuloRemainderComputationVisitorFactoryBeanFactory.createVisitor();

    const infrastructure: IModuloRemainderComputationInfrastructure = {
      chainHandler,
      commandInvoker,
      computationVisitor,
      strategyProvider,
      registeredDivisors: divisors,
    };

    ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory.infrastructure = infrastructure;
    ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory.infrastructureInitialized = true;

    return infrastructure;
  }

  static getInfrastructure(): IModuloRemainderComputationInfrastructure | null {
    return ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory.infrastructure;
  }

  static isInfrastructureInitialized(): boolean {
    return ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory.infrastructureInitialized;
  }

  static getFactoryBeanName(): string {
    return ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ModuloRemainderComputationInfrastructureInitializerFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

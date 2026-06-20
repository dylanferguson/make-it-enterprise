import { AbstractBaseModuloEvaluationStrategyFactoryBean } from "../../abstracts/AbstractBaseModuloEvaluationStrategyFactoryBean.js";
import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";
import type { IModuloEvaluationStrategy } from "../../contracts/IModuloEvaluationStrategy.js";
import type { IRemainderComputationSupervisor } from "../../contracts/IRemainderComputationSupervisor.js";
import { ModuloEvaluationStrategyProviderImpl } from "../providers/ModuloEvaluationStrategyProviderImpl.js";
import { ModuloEvaluationStrategyRegistryImpl } from "../registry/ModuloEvaluationStrategyRegistryImpl.js";
import { StandardRemainderModuloEvaluationStrategyImpl } from "../strategies/StandardRemainderModuloEvaluationStrategyImpl.js";
import { SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory } from "./SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.js";

export class ModuloEvaluationStrategyFactoryBeanImpl extends AbstractBaseModuloEvaluationStrategyFactoryBean {
  private readonly remainderComputationSupervisor: IRemainderComputationSupervisor;

  constructor(
    factoryBeanName: string = "DefaultModuloEvaluationStrategyFactoryBean",
    factoryBeanVersion: string = "2.0.0-ENTERPRISE",
    remainderComputationSupervisor?: IRemainderComputationSupervisor,
  ) {
    super(factoryBeanName, factoryBeanVersion, true);
    this.remainderComputationSupervisor =
      remainderComputationSupervisor ??
      SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.createSingletonSupervisedDecoratedDelegationService();
  }

  override createProvider(): IModuloEvaluationStrategyProvider {
    this.logInstantiation("ModuloEvaluationStrategyProvider");
    const registry = new ModuloEvaluationStrategyRegistryImpl();
    const defaultStrategy: IModuloEvaluationStrategy =
      new StandardRemainderModuloEvaluationStrategyImpl(
        this.remainderComputationSupervisor,
      );
    registry.registerStrategy(3, defaultStrategy);
    registry.registerStrategy(5, defaultStrategy);
    registry.registerStrategy(15, defaultStrategy);
    const provider = new ModuloEvaluationStrategyProviderImpl(registry);
    provider.setDefaultStrategy(defaultStrategy);
    return provider;
  }

  getRemainderComputationSupervisor(): IRemainderComputationSupervisor {
    return this.remainderComputationSupervisor;
  }
}

export class ModuloEvaluationStrategyFactoryBeanFactory {
  static createFactoryBean(
    factoryBeanName: string = "DefaultModuloEvaluationStrategyFactoryBean",
    remainderComputationSupervisor?: IRemainderComputationSupervisor,
  ): ModuloEvaluationStrategyFactoryBeanImpl {
    return new ModuloEvaluationStrategyFactoryBeanImpl(
      factoryBeanName,
      "2.0.0-ENTERPRISE",
      remainderComputationSupervisor,
    );
  }
}

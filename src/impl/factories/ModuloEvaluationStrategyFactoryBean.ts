import { AbstractBaseModuloEvaluationStrategyFactoryBean } from "../../abstracts/AbstractBaseModuloEvaluationStrategyFactoryBean.js";
import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";
import type { IModuloEvaluationStrategy } from "../../contracts/IModuloEvaluationStrategy.js";
import type { IRemainderComputationSupervisor } from "../../contracts/IRemainderComputationSupervisor.js";
import type { IDivisibilityEvaluationStrategyChain } from "../../contracts/IDivisibilityEvaluationStrategyChain.js";
import { ModuloEvaluationStrategyProviderImpl } from "../providers/ModuloEvaluationStrategyProviderImpl.js";
import { ModuloEvaluationStrategyRegistryImpl } from "../registry/ModuloEvaluationStrategyRegistryImpl.js";
import { StandardRemainderModuloEvaluationStrategyImpl } from "../strategies/StandardRemainderModuloEvaluationStrategyImpl.js";
import { ChainBasedModuloEvaluationStrategyImpl } from "../strategies/ChainBasedModuloEvaluationStrategyImpl.js";
import { SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory } from "./SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.js";
import { DivisibilityEvaluationStrategyChainFactoryBeanFactory } from "./DivisibilityEvaluationStrategyChainFactoryBeanFactory.js";

export class ModuloEvaluationStrategyFactoryBeanImpl extends AbstractBaseModuloEvaluationStrategyFactoryBean {
  private readonly remainderComputationSupervisor: IRemainderComputationSupervisor;
  private readonly evaluationChain: IDivisibilityEvaluationStrategyChain | null;
  private readonly enterpriseMode: boolean;

  constructor(
    factoryBeanName: string = "DefaultModuloEvaluationStrategyFactoryBean",
    factoryBeanVersion: string = "2.0.0-ENTERPRISE",
    remainderComputationSupervisor?: IRemainderComputationSupervisor,
    evaluationChain?: IDivisibilityEvaluationStrategyChain,
    enterpriseMode: boolean = false,
  ) {
    super(factoryBeanName, factoryBeanVersion, true);
    this.remainderComputationSupervisor =
      remainderComputationSupervisor ??
      SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.createSingletonSupervisedDecoratedDelegationService();
    this.evaluationChain = evaluationChain ?? null;
    this.enterpriseMode = enterpriseMode;
  }

  override createProvider(): IModuloEvaluationStrategyProvider {
    this.logInstantiation("ModuloEvaluationStrategyProvider");
    const registry = new ModuloEvaluationStrategyRegistryImpl();

    let defaultStrategy: IModuloEvaluationStrategy;

    if (this.evaluationChain !== null) {
      this.logInstantiation("ChainBasedModuloEvaluationStrategy");
      defaultStrategy = new ChainBasedModuloEvaluationStrategyImpl(
        this.evaluationChain,
      );
    } else {
      const chainFactoryBean = DivisibilityEvaluationStrategyChainFactoryBeanFactory.createFactoryBean(true, true, 1000, this.enterpriseMode);
      const chain = chainFactoryBean.createChain();
      defaultStrategy = new ChainBasedModuloEvaluationStrategyImpl(chain);
    }

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

  getEvaluationChain(): IDivisibilityEvaluationStrategyChain | null {
    return this.evaluationChain;
  }
}

export class ModuloEvaluationStrategyFactoryBeanFactory {
  static createFactoryBean(
    factoryBeanName: string = "DefaultModuloEvaluationStrategyFactoryBean",
    remainderComputationSupervisor?: IRemainderComputationSupervisor,
    enterpriseMode: boolean = false,
  ): ModuloEvaluationStrategyFactoryBeanImpl {
    return new ModuloEvaluationStrategyFactoryBeanImpl(
      factoryBeanName,
      "2.0.0-ENTERPRISE",
      remainderComputationSupervisor,
      undefined,
      enterpriseMode,
    );
  }
}

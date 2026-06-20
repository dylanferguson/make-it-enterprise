import { AbstractBaseModuloEvaluationStrategyFactoryBean } from "../../abstracts/AbstractBaseModuloEvaluationStrategyFactoryBean.js";
import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";
import type { IModuloEvaluationStrategy } from "../../contracts/IModuloEvaluationStrategy.js";
import { ModuloEvaluationStrategyProviderImpl } from "../providers/ModuloEvaluationStrategyProviderImpl.js";
import { ModuloEvaluationStrategyRegistryImpl } from "../registry/ModuloEvaluationStrategyRegistryImpl.js";
import { StandardRemainderModuloEvaluationStrategyImpl } from "../strategies/StandardRemainderModuloEvaluationStrategyImpl.js";

export class ModuloEvaluationStrategyFactoryBeanImpl extends AbstractBaseModuloEvaluationStrategyFactoryBean {
  constructor(
    factoryBeanName: string = "DefaultModuloEvaluationStrategyFactoryBean",
    factoryBeanVersion: string = "2.0.0-ENTERPRISE",
  ) {
    super(factoryBeanName, factoryBeanVersion, true);
  }

  override createProvider(): IModuloEvaluationStrategyProvider {
    this.logInstantiation("ModuloEvaluationStrategyProvider");
    const registry = new ModuloEvaluationStrategyRegistryImpl();
    const defaultStrategy: IModuloEvaluationStrategy =
      new StandardRemainderModuloEvaluationStrategyImpl();
    registry.registerStrategy(3, defaultStrategy);
    registry.registerStrategy(5, defaultStrategy);
    registry.registerStrategy(15, defaultStrategy);
    const provider = new ModuloEvaluationStrategyProviderImpl(registry);
    provider.setDefaultStrategy(defaultStrategy);
    return provider;
  }
}

export class ModuloEvaluationStrategyFactoryBeanFactory {
  static createFactoryBean(
    factoryBeanName: string = "DefaultModuloEvaluationStrategyFactoryBean",
  ): ModuloEvaluationStrategyFactoryBeanImpl {
    return new ModuloEvaluationStrategyFactoryBeanImpl(factoryBeanName);
  }
}

import { AbstractBaseDivisibilityEvaluationStrategyChainFactory } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainFactory.js";
import type { IDivisibilityEvaluationStrategyChain } from "../../contracts/IDivisibilityEvaluationStrategyChain.js";
import type { IDivisibilityEvaluationStrategyChainBuilder } from "../../contracts/IDivisibilityEvaluationStrategyChainBuilder.js";
import type { IDivisibilityEvaluationStrategyChainLink } from "../../contracts/IDivisibilityEvaluationStrategyChainLink.js";
import { ChainBasedDivisibilityEvaluationStrategyChainImpl } from "../chains/ChainBasedDivisibilityEvaluationStrategyChainImpl.js";
import { ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl.js";
import { CachingDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/CachingDivisibilityEvaluationStrategyChainLinkImpl.js";
import { AuditTrailDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/AuditTrailDivisibilityEvaluationStrategyChainLinkImpl.js";
import { DivisibilityEvaluationStrategyChainBuilderImpl } from "../builders/DivisibilityEvaluationStrategyChainBuilderImpl.js";
import { DivisibilityEvaluationStrategyChainConfigurationContextImpl } from "../configuration/DivisibilityEvaluationStrategyChainConfigurationContextImpl.js";

export class DivisibilityEvaluationStrategyChainFactoryBeanImpl extends AbstractBaseDivisibilityEvaluationStrategyChainFactory {
  private static readonly FACTORY_BEAN_NAME = "DivisibilityEvaluationStrategyChainFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "2.0.0-ENTERPRISE";

  private readonly configurationContext: DivisibilityEvaluationStrategyChainConfigurationContextImpl;

  constructor(configurationContext: DivisibilityEvaluationStrategyChainConfigurationContextImpl) {
    super(
      DivisibilityEvaluationStrategyChainFactoryBeanImpl.FACTORY_BEAN_NAME,
      DivisibilityEvaluationStrategyChainFactoryBeanImpl.FACTORY_BEAN_VERSION,
      true,
    );
    this.configurationContext = configurationContext;
  }

  override createChain(): IDivisibilityEvaluationStrategyChain {
    this.logInstantiation("ChainBasedDivisibilityEvaluationStrategyChain");
    const builder: IDivisibilityEvaluationStrategyChainBuilder = new DivisibilityEvaluationStrategyChainBuilderImpl();

    if (this.configurationContext.isCachingEnabled()) {
      builder.addLink(new CachingDivisibilityEvaluationStrategyChainLinkImpl(
        this.configurationContext.getMaxCacheSize(),
      ));
    }

    if (this.configurationContext.isAuditTrailEnabled()) {
      builder.addLink(new AuditTrailDivisibilityEvaluationStrategyChainLinkImpl());
    }

    builder.addLink(new ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl());

    const headLink: IDivisibilityEvaluationStrategyChainLink = builder.build();
    return new ChainBasedDivisibilityEvaluationStrategyChainImpl(headLink);
  }

  getConfigurationContext(): DivisibilityEvaluationStrategyChainConfigurationContextImpl {
    return this.configurationContext;
  }
}

export class DivisibilityEvaluationStrategyChainFactoryBeanFactory {
  private static instance: DivisibilityEvaluationStrategyChainFactoryBeanImpl | null = null;

  static createFactoryBean(
    enableCaching: boolean = true,
    enableAuditTrail: boolean = false,
    maxCacheSize: number = 1000,
  ): DivisibilityEvaluationStrategyChainFactoryBeanImpl {
    if (DivisibilityEvaluationStrategyChainFactoryBeanFactory.instance === null) {
      const config = new DivisibilityEvaluationStrategyChainConfigurationContextImpl(
        enableCaching,
        enableAuditTrail,
        maxCacheSize,
      );
      DivisibilityEvaluationStrategyChainFactoryBeanFactory.instance =
        new DivisibilityEvaluationStrategyChainFactoryBeanImpl(config);
    }
    return DivisibilityEvaluationStrategyChainFactoryBeanFactory.instance;
  }

  static createFactoryBeanWithConfiguration(
    config: DivisibilityEvaluationStrategyChainConfigurationContextImpl,
  ): DivisibilityEvaluationStrategyChainFactoryBeanImpl {
    if (DivisibilityEvaluationStrategyChainFactoryBeanFactory.instance === null) {
      DivisibilityEvaluationStrategyChainFactoryBeanFactory.instance =
        new DivisibilityEvaluationStrategyChainFactoryBeanImpl(config);
    }
    return DivisibilityEvaluationStrategyChainFactoryBeanFactory.instance;
  }

  static resetFactoryBean(): void {
    DivisibilityEvaluationStrategyChainFactoryBeanFactory.instance = null;
  }

  static getInstance(): DivisibilityEvaluationStrategyChainFactoryBeanImpl | null {
    return DivisibilityEvaluationStrategyChainFactoryBeanFactory.instance;
  }
}

import { AbstractBaseDivisibilityEvaluationStrategyChainFactory } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainFactory.js";
import type { IDivisibilityEvaluationStrategyChain } from "../../contracts/IDivisibilityEvaluationStrategyChain.js";
import type { IDivisibilityEvaluationStrategyChainBuilder } from "../../contracts/IDivisibilityEvaluationStrategyChainBuilder.js";
import type { IDivisibilityEvaluationStrategyChainLink } from "../../contracts/IDivisibilityEvaluationStrategyChainLink.js";
import { ChainBasedDivisibilityEvaluationStrategyChainImpl } from "../chains/ChainBasedDivisibilityEvaluationStrategyChainImpl.js";
import { ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl.js";
import { CachingDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/CachingDivisibilityEvaluationStrategyChainLinkImpl.js";
import { AuditTrailDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/AuditTrailDivisibilityEvaluationStrategyChainLinkImpl.js";
import { ValidationDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/ValidationDivisibilityEvaluationStrategyChainLinkImpl.js";
import { MetricsCollectingDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/MetricsCollectingDivisibilityEvaluationStrategyChainLinkImpl.js";
import { LatencyThresholdDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/LatencyThresholdDivisibilityEvaluationStrategyChainLinkImpl.js";
import { ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl } from "../chains/ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl.js";
import { DivisibilityEvaluationStrategyChainBuilderImpl } from "../builders/DivisibilityEvaluationStrategyChainBuilderImpl.js";
import { EnterpriseDivisibilityEvaluationStrategyChainConfigurationContextImpl } from "../configuration/EnterpriseDivisibilityEvaluationStrategyChainConfigurationContextImpl.js";

export class EnterpriseDivisibilityEvaluationStrategyChainFactoryImpl extends AbstractBaseDivisibilityEvaluationStrategyChainFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityEvaluationStrategyChainFactory";
  private static readonly FACTORY_BEAN_VERSION = "3.0.0-ENTERPRISE";

  private readonly configurationContext: EnterpriseDivisibilityEvaluationStrategyChainConfigurationContextImpl;

  constructor(configurationContext: EnterpriseDivisibilityEvaluationStrategyChainConfigurationContextImpl) {
    super(
      EnterpriseDivisibilityEvaluationStrategyChainFactoryImpl.FACTORY_BEAN_NAME,
      EnterpriseDivisibilityEvaluationStrategyChainFactoryImpl.FACTORY_BEAN_VERSION,
      true,
    );
    this.configurationContext = configurationContext;
  }

  override createChain(): IDivisibilityEvaluationStrategyChain {
    this.logInstantiation("EnterpriseChainBasedDivisibilityEvaluationStrategyChain");
    const builder: IDivisibilityEvaluationStrategyChainBuilder = new DivisibilityEvaluationStrategyChainBuilderImpl();

    if (this.configurationContext.isValidationEnabled()) {
      builder.addLink(new ValidationDivisibilityEvaluationStrategyChainLinkImpl());
    }

    if (this.configurationContext.isCachingEnabled()) {
      builder.addLink(new CachingDivisibilityEvaluationStrategyChainLinkImpl(
        this.configurationContext.getMaxCacheSize(),
      ));
    }

    if (this.configurationContext.isMetricsCollectionEnabled()) {
      builder.addLink(new MetricsCollectingDivisibilityEvaluationStrategyChainLinkImpl());
    }

    if (this.configurationContext.isAuditTrailEnabled()) {
      builder.addLink(new AuditTrailDivisibilityEvaluationStrategyChainLinkImpl());
    }

    if (this.configurationContext.isLatencyThresholdEnabled()) {
      builder.addLink(new LatencyThresholdDivisibilityEvaluationStrategyChainLinkImpl(
        this.configurationContext.getLatencyWarnThresholdMs(),
        this.configurationContext.getLatencyCriticalThresholdMs(),
      ));
    }

    if (this.configurationContext.isThreadBoundaryEnabled()) {
      builder.addLink(new ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl());
    }

    builder.addLink(new ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl());

    const headLink: IDivisibilityEvaluationStrategyChainLink = builder.build();
    return new ChainBasedDivisibilityEvaluationStrategyChainImpl(headLink);
  }

  getConfigurationContext(): EnterpriseDivisibilityEvaluationStrategyChainConfigurationContextImpl {
    return this.configurationContext;
  }
}

export class EnterpriseDivisibilityEvaluationStrategyChainFactoryBeanFactory {
  private static instance: EnterpriseDivisibilityEvaluationStrategyChainFactoryImpl | null = null;

  static createFactoryBean(
    config?: EnterpriseDivisibilityEvaluationStrategyChainConfigurationContextImpl,
  ): EnterpriseDivisibilityEvaluationStrategyChainFactoryImpl {
    if (EnterpriseDivisibilityEvaluationStrategyChainFactoryBeanFactory.instance === null) {
      const effectiveConfig = config ?? new EnterpriseDivisibilityEvaluationStrategyChainConfigurationContextImpl();
      EnterpriseDivisibilityEvaluationStrategyChainFactoryBeanFactory.instance =
        new EnterpriseDivisibilityEvaluationStrategyChainFactoryImpl(effectiveConfig);
    }
    return EnterpriseDivisibilityEvaluationStrategyChainFactoryBeanFactory.instance;
  }

  static resetFactoryBean(): void {
    EnterpriseDivisibilityEvaluationStrategyChainFactoryBeanFactory.instance = null;
  }

  static getInstance(): EnterpriseDivisibilityEvaluationStrategyChainFactoryImpl | null {
    return EnterpriseDivisibilityEvaluationStrategyChainFactoryBeanFactory.instance;
  }
}

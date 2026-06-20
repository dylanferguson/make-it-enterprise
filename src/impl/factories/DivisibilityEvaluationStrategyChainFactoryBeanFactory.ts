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
import { DivisibilityEvaluationStrategyChainConfigurationContextImpl } from "../configuration/DivisibilityEvaluationStrategyChainConfigurationContextImpl.js";
import { ModuloOperationHandlerDelegationBridgeFactoryBeanFactory } from "./ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.js";

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

    if (this.configurationContext.isEnterpriseMode() && this.configurationContext.isCachingEnabled()) {
      builder.addLink(new ValidationDivisibilityEvaluationStrategyChainLinkImpl());
    }

    if (this.configurationContext.isCachingEnabled()) {
      builder.addLink(new CachingDivisibilityEvaluationStrategyChainLinkImpl(
        this.configurationContext.getMaxCacheSize(),
      ));
    }

    if (this.configurationContext.isEnterpriseMode()) {
      builder.addLink(new MetricsCollectingDivisibilityEvaluationStrategyChainLinkImpl());
    }

    if (this.configurationContext.isAuditTrailEnabled()) {
      builder.addLink(new AuditTrailDivisibilityEvaluationStrategyChainLinkImpl());
    }

    if (this.configurationContext.isEnterpriseMode()) {
      builder.addLink(new LatencyThresholdDivisibilityEvaluationStrategyChainLinkImpl());
    }

    if (this.configurationContext.isEnterpriseMode()) {
      builder.addLink(new ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl());
    }

    const terminalLink = new ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl();
    if (this.configurationContext.isEnterpriseMode()) {
      const bridge = ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.createBridge();
      terminalLink.setDelegationBridge(bridge);
    }
    builder.addLink(terminalLink);

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
    enterpriseMode: boolean = false,
  ): DivisibilityEvaluationStrategyChainFactoryBeanImpl {
    if (DivisibilityEvaluationStrategyChainFactoryBeanFactory.instance === null) {
      const config = new DivisibilityEvaluationStrategyChainConfigurationContextImpl(
        enableCaching,
        enableAuditTrail,
        maxCacheSize,
        enterpriseMode,
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

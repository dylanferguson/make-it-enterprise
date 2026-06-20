import type { IDivisibilityEvaluationSupervisionChain } from "../../contracts/IDivisibilityEvaluationSupervisionChain.js";
import type { IDivisibilityEvaluationSupervisionChainLink } from "../../contracts/IDivisibilityEvaluationSupervisionChainLink.js";
import { EnterpriseDivisibilityEvaluationSupervisionChainImpl } from "./EnterpriseDivisibilityEvaluationSupervisionChainImpl.js";
import { ModuloEvaluationSupervisionChainLinkImpl } from "./ModuloEvaluationSupervisionChainLinkImpl.js";
import { AuditTrailDivisibilityEvaluationSupervisionChainDecoratorImpl } from "./AuditTrailDivisibilityEvaluationSupervisionChainDecoratorImpl.js";
import { CachingDivisibilityEvaluationSupervisionChainDecoratorImpl } from "./CachingDivisibilityEvaluationSupervisionChainDecoratorImpl.js";
import { MetricsCollectingDivisibilityEvaluationSupervisionChainDecoratorImpl } from "./MetricsCollectingDivisibilityEvaluationSupervisionChainDecoratorImpl.js";

export class DivisibilityEvaluationSupervisionChainBuilder {
  private static readonly BUILDER_NAME = "DivisibilityEvaluationSupervisionChainBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-ENTERPRISE";

  private auditEnabled: boolean = true;
  private cachingEnabled: boolean = true;
  private metricsEnabled: boolean = true;
  private customLinks: IDivisibilityEvaluationSupervisionChainLink[] = [];

  withAudit(enabled: boolean): this {
    this.auditEnabled = enabled;
    return this;
  }

  withCaching(enabled: boolean): this {
    this.cachingEnabled = enabled;
    return this;
  }

  withMetrics(enabled: boolean): this {
    this.metricsEnabled = enabled;
    return this;
  }

  withCustomLink(link: IDivisibilityEvaluationSupervisionChainLink): this {
    this.customLinks.push(link);
    return this;
  }

  build(): IDivisibilityEvaluationSupervisionChain {
    const chain = new EnterpriseDivisibilityEvaluationSupervisionChainImpl(
      DivisibilityEvaluationSupervisionChainBuilder.BUILDER_NAME,
      DivisibilityEvaluationSupervisionChainBuilder.BUILDER_VERSION,
    );

    let coreLink: IDivisibilityEvaluationSupervisionChainLink = new ModuloEvaluationSupervisionChainLinkImpl();

    if (this.cachingEnabled) {
      coreLink = new CachingDivisibilityEvaluationSupervisionChainDecoratorImpl(coreLink);
    }
    if (this.auditEnabled) {
      coreLink = new AuditTrailDivisibilityEvaluationSupervisionChainDecoratorImpl(coreLink);
    }
    if (this.metricsEnabled) {
      coreLink = new MetricsCollectingDivisibilityEvaluationSupervisionChainDecoratorImpl(coreLink);
    }

    chain.registerChainLink(coreLink);

    for (const custom of this.customLinks) {
      chain.registerChainLink(custom);
    }

    return chain;
  }

  static getBuilderName(): string {
    return DivisibilityEvaluationSupervisionChainBuilder.BUILDER_NAME;
  }

  static getBuilderVersion(): string {
    return DivisibilityEvaluationSupervisionChainBuilder.BUILDER_VERSION;
  }
}

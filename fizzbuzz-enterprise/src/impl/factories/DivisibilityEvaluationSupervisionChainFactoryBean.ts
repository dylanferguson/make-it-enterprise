import type { IDivisibilityEvaluationSupervisionChain } from "../../contracts/IDivisibilityEvaluationSupervisionChain.js";
import { DivisibilityEvaluationSupervisionChainBuilder } from "../supervision/DivisibilityEvaluationSupervisionChainBuilder.js";

export class DivisibilityEvaluationSupervisionChainFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "DivisibilityEvaluationSupervisionChainFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN";

  private static chain: IDivisibilityEvaluationSupervisionChain | null = null;

  static createSupervisionChain(
    auditEnabled: boolean = true,
    cachingEnabled: boolean = true,
    metricsEnabled: boolean = true,
  ): IDivisibilityEvaluationSupervisionChain {
    if (DivisibilityEvaluationSupervisionChainFactoryBean.chain === null) {
      const builder = new DivisibilityEvaluationSupervisionChainBuilder();
      const chain = builder
        .withAudit(auditEnabled)
        .withCaching(cachingEnabled)
        .withMetrics(metricsEnabled)
        .build();
      DivisibilityEvaluationSupervisionChainFactoryBean.chain = chain;
      console.debug(
        `[${DivisibilityEvaluationSupervisionChainFactoryBean.FACTORY_BEAN_NAME}] ` +
        `Supervision chain created: ${chain.getChainName()} v${chain.getChainVersion()} ` +
        `(${chain.getRegisteredLinkCount()} registered link(s))`,
      );
    }
    return DivisibilityEvaluationSupervisionChainFactoryBean.chain!;
  }

  static getSupervisionChain(): IDivisibilityEvaluationSupervisionChain | null {
    return DivisibilityEvaluationSupervisionChainFactoryBean.chain;
  }

  static resetSupervisionChain(): void {
    DivisibilityEvaluationSupervisionChainFactoryBean.chain = null;
  }

  static getFactoryBeanName(): string {
    return DivisibilityEvaluationSupervisionChainFactoryBean.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return DivisibilityEvaluationSupervisionChainFactoryBean.FACTORY_BEAN_VERSION;
  }

  static isInitialized(): boolean {
    return DivisibilityEvaluationSupervisionChainFactoryBean.chain !== null;
  }
}

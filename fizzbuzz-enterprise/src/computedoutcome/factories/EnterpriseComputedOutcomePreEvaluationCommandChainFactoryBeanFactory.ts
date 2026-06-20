import { DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl } from "../impl/chain/DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl.js";
import { DivisibleByFifteenPreEvaluationCommandImpl } from "../impl/commands/DivisibleByFifteenPreEvaluationCommandImpl.js";
import { DivisibleByFivePreEvaluationCommandImpl } from "../impl/commands/DivisibleByFivePreEvaluationCommandImpl.js";
import { DivisibleByThreePreEvaluationCommandImpl } from "../impl/commands/DivisibleByThreePreEvaluationCommandImpl.js";
import { NumberStringFallbackPreEvaluationCommandImpl } from "../impl/commands/NumberStringFallbackPreEvaluationCommandImpl.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommand } from "../contracts/index.js";

export class EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PRE-EVAL-CHAIN-FACTORY-BEAN";

  private static chainSingleton: DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl | null = null;
  private static initialized = false;

  static createFullChain(
    includeFallback: boolean = true,
  ): DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl {
    if (EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.initialized) {
      return EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.chainSingleton!;
    }
    const chain = new DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl();
    chain.addCommand(new DivisibleByFifteenPreEvaluationCommandImpl());
    chain.addCommand(new DivisibleByFivePreEvaluationCommandImpl());
    chain.addCommand(new DivisibleByThreePreEvaluationCommandImpl());
    if (includeFallback) {
      chain.addCommand(new NumberStringFallbackPreEvaluationCommandImpl());
    }
    EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.chainSingleton = chain;
    EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.initialized = true;
    console.debug(
      `[${EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Pre-evaluation command chain created: [${chain.getChainName()} v${chain.getChainVersion()}], ` +
      `commands=[${chain.getRegisteredCommandNames().join(", ")}]`,
    );
    return chain;
  }

  static createCustomChain(
    commands: IEnterpriseComputedOutcomePreEvaluationCommand[],
  ): DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl {
    const chain = new DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl();
    for (const command of commands) {
      chain.addCommand(command);
    }
    return chain;
  }

  static getChain(): DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl | null {
    return EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.chainSingleton;
  }

  static isInitialized(): boolean {
    return EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.initialized;
  }

  static reset(): void {
    EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.chainSingleton = null;
    EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.initialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

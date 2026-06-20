import type { IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.js";
import type { IEnterpriseFizzBuzzResolutionDirectiveFactory } from "../../contracts/IEnterpriseFizzBuzzResolutionDirectiveFactory.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";
import { DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl } from "../orchestrator/DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl.js";
import { StandardEnterpriseFizzBuzzResolutionDirectiveFactoryImpl } from "./StandardEnterpriseFizzBuzzResolutionDirectiveFactoryImpl.js";
import { DefaultEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolverImpl } from "../resolvers/DefaultEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolverImpl.js";
import { PriorityBasedEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategyImpl } from "../selectors/PriorityBasedEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategyImpl.js";
import { StandardForwardingEnterpriseFizzBuzzDirectiveResolutionMediationStrategyImpl } from "../strategies/StandardForwardingEnterpriseFizzBuzzDirectiveResolutionMediationStrategyImpl.js";
import { DirectiveLoggingAuditingMediationChainHandlerImpl } from "../handlers/DirectiveLoggingAuditingMediationChainHandlerImpl.js";

export const DirectiveResolutionMediationOrchestratorConfigurationProfile = {
  STANDARD: "STANDARD",
  FULLY_MEDIATED: "FULLY_MEDIATED",
  MINIMAL: "MINIMAL",
} as const;

export type DirectiveResolutionMediationOrchestratorConfigurationProfile =
  (typeof DirectiveResolutionMediationOrchestratorConfigurationProfile)[keyof typeof DirectiveResolutionMediationOrchestratorConfigurationProfile];

export class EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DIRECTIVE-MEDIATION-ORCHESTRATOR-FACTORY";

  private static orchestratorInstance: IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator | null = null;
  private static currentProfile: DirectiveResolutionMediationOrchestratorConfigurationProfile =
    DirectiveResolutionMediationOrchestratorConfigurationProfile.STANDARD;

  static createOrchestrator(
    profile: DirectiveResolutionMediationOrchestratorConfigurationProfile = DirectiveResolutionMediationOrchestratorConfigurationProfile.STANDARD,
  ): IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator {
    if (
      EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.orchestratorInstance === null ||
      EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.currentProfile !== profile
    ) {
      EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.currentProfile = profile;
      EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.orchestratorInstance =
        EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.buildOrchestratorForProfile(profile);
    }
    return EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.orchestratorInstance;
  }

  static getOrchestrator(): IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator | null {
    return EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.orchestratorInstance;
  }

  static resetOrchestrator(): void {
    EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.orchestratorInstance = null;
    EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.currentProfile =
      DirectiveResolutionMediationOrchestratorConfigurationProfile.STANDARD;
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  private static buildOrchestratorForProfile(
    profile: DirectiveResolutionMediationOrchestratorConfigurationProfile,
  ): IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator {
    const directiveFactory = new StandardEnterpriseFizzBuzzResolutionDirectiveFactoryImpl();
    const strategyResolver = new DefaultEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolverImpl();
    const strategySelector = new PriorityBasedEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategyImpl();

    switch (profile) {
      case DirectiveResolutionMediationOrchestratorConfigurationProfile.FULLY_MEDIATED: {
        const forwardingStrategy =
          new StandardForwardingEnterpriseFizzBuzzDirectiveResolutionMediationStrategyImpl();
        const auditingHandler = new DirectiveLoggingAuditingMediationChainHandlerImpl();
        strategyResolver.registerStrategy(
          forwardingStrategy.getStrategyName(),
          forwardingStrategy,
        );
        const orchestrator = new DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl(
          directiveFactory,
          strategyResolver,
          strategySelector,
          [auditingHandler],
        );
        orchestrator.registerMediationStrategy(
          forwardingStrategy.getStrategyName(),
          forwardingStrategy,
        );
        return orchestrator;
      }
      case DirectiveResolutionMediationOrchestratorConfigurationProfile.STANDARD:
      default: {
        const forwardingStrategy =
          new StandardForwardingEnterpriseFizzBuzzDirectiveResolutionMediationStrategyImpl();
        strategyResolver.registerStrategy(
          forwardingStrategy.getStrategyName(),
          forwardingStrategy,
        );
        const orchestrator = new DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl(
          directiveFactory,
          strategyResolver,
          strategySelector,
        );
        orchestrator.registerMediationStrategy(
          forwardingStrategy.getStrategyName(),
          forwardingStrategy,
        );
        return orchestrator;
      }
      case DirectiveResolutionMediationOrchestratorConfigurationProfile.MINIMAL: {
        return new DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl(
          directiveFactory,
          strategyResolver,
          strategySelector,
        );
      }
    }
  }
}

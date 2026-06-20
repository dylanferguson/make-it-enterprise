import type { IFizzBuzzPipelineManager } from "../contracts/IFizzBuzzPipelineManager.js";
import type { IFizzBuzzPipelineConfigurationProfile } from "../contracts/IFizzBuzzPipelineConfigurationProfile.js";
import type { IFizzBuzzPipelineStrategySelector } from "../contracts/IFizzBuzzPipelineStrategySelector.js";
import type { IFizzBuzzPipelineExecutionCommand } from "../contracts/IFizzBuzzPipelineExecutionCommand.js";
import type { IFizzBuzzPipelineResultVisitor } from "../contracts/IFizzBuzzPipelineResultVisitor.js";
import type { IEnterpriseFizzBuzzResolutionDelegationOrchestrator } from "../../resolutiondelegation/contracts/IEnterpriseFizzBuzzResolutionDelegationOrchestrator.js";
import type { IFizzBuzzEnterpriseBusinessDelegate } from "../../contracts/IFizzBuzzEnterpriseBusinessDelegate.js";
import { DefaultFizzBuzzPipelineManagerImpl } from "../impl/DefaultFizzBuzzPipelineManagerImpl.js";
import { StandardFizzBuzzPipelineConfigurationProfileImpl } from "../impl/StandardFizzBuzzPipelineConfigurationProfileImpl.js";
import { DelegationOrchestratorPipelineExecutionCommandImpl } from "../commands/DelegationOrchestratorPipelineExecutionCommandImpl.js";
import { ConfigurationProfileAwarePipelineStrategySelectorImpl } from "../strategies/ConfigurationProfileAwarePipelineStrategySelectorImpl.js";
import { GovernanceEnforcementPipelineManagerDecoratorImpl } from "../decorators/GovernanceEnforcementPipelineManagerDecoratorImpl.js";
import { DefaultAuditTrailPipelineResultVisitorImpl } from "../impl/DefaultAuditTrailPipelineResultVisitorImpl.js";

export const FizzBuzzPipelineManagerConfigurationProfile = {
  STANDARD: "STANDARD",
  STRICT_GOVERNANCE: "STRICT_GOVERNANCE",
  AUDIT_ENABLED: "AUDIT_ENABLED",
} as const;

export type FizzBuzzPipelineManagerConfigurationProfile =
  (typeof FizzBuzzPipelineManagerConfigurationProfile)[keyof typeof FizzBuzzPipelineManagerConfigurationProfile];

export class FizzBuzzPipelineManagerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzPipelineManagerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PIPELINE-MANAGER-FACTORY";

  private static managerSingleton: IFizzBuzzPipelineManager | null = null;

  static createPipelineManager(
    delegationOrchestrator: IEnterpriseFizzBuzzResolutionDelegationOrchestrator,
    businessDelegate: IFizzBuzzEnterpriseBusinessDelegate,
    profile: FizzBuzzPipelineManagerConfigurationProfile = "STANDARD",
  ): IFizzBuzzPipelineManager {
    if (
      FizzBuzzPipelineManagerFactoryBeanFactory.managerSingleton !== null
    ) {
      return FizzBuzzPipelineManagerFactoryBeanFactory.managerSingleton;
    }

    const command = new DelegationOrchestratorPipelineExecutionCommandImpl(
      delegationOrchestrator,
      businessDelegate,
    );

    const configurationProfile = new StandardFizzBuzzPipelineConfigurationProfileImpl(
      profile === "STRICT_GOVERNANCE",
      profile !== "STANDARD" || true,
      true,
      50,
    );

    const strategySelector = new ConfigurationProfileAwarePipelineStrategySelectorImpl(command);

    const baseManager = new DefaultFizzBuzzPipelineManagerImpl(
      strategySelector,
      configurationProfile,
    );

    const auditVisitor = new DefaultAuditTrailPipelineResultVisitorImpl();
    baseManager.registerPipelineVisitor(auditVisitor);

    const governanceDecoratedManager = new GovernanceEnforcementPipelineManagerDecoratorImpl(
      baseManager,
    );

    FizzBuzzPipelineManagerFactoryBeanFactory.managerSingleton = governanceDecoratedManager;

    console.debug(
      `[${FizzBuzzPipelineManagerFactoryBeanFactory.FACTORY_BEAN_NAME}] Pipeline manager created: ` +
      `manager=[${governanceDecoratedManager.getManagerName()} v${governanceDecoratedManager.getManagerVersion()}], ` +
      `profile=[${configurationProfile.getProfileName()} v${configurationProfile.getProfileVersion()}], ` +
      `strategySelector=[${strategySelector.getStrategySelectorName()} v${strategySelector.getStrategySelectorVersion()}], ` +
      `command=[${command.getCommandDescriptor()}], ` +
      `visitors=[${governanceDecoratedManager.getRegisteredPipelineVisitorNames().join(", ")}], ` +
      `validation=[${configurationProfile.isValidationEnabled()}], ` +
      `audit=[${configurationProfile.isAuditTrailEnabled()}], ` +
      `governance=[${configurationProfile.isGovernanceEnforcementEnabled()}], ` +
      `slaThresholdMs=[${configurationProfile.getSlaThresholdMs()}]`,
    );

    return governanceDecoratedManager;
  }

  static getPipelineManager(): IFizzBuzzPipelineManager | null {
    return FizzBuzzPipelineManagerFactoryBeanFactory.managerSingleton;
  }

  static isPipelineManagerInitialized(): boolean {
    return FizzBuzzPipelineManagerFactoryBeanFactory.managerSingleton !== null &&
      FizzBuzzPipelineManagerFactoryBeanFactory.managerSingleton.isPipelineInitialized();
  }

  static resetPipelineManager(): void {
    FizzBuzzPipelineManagerFactoryBeanFactory.managerSingleton = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzPipelineManagerFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzPipelineManagerFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

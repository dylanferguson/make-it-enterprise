import type { IEnterpriseComputationResolutionLifecycleOrchestrator } from "../contracts/IEnterpriseComputationResolutionLifecycleOrchestrator.js";
import type { IComputationOutcomeLifecycleSpecificationValidator } from "../contracts/IComputationOutcomeLifecycleSpecificationValidator.js";
import type { IComputationOutcomeLifecycleChainHandler } from "../contracts/IComputationOutcomeLifecycleChainHandler.js";
import type { IComputationOutcomeLifecycleVisitor } from "../contracts/IComputationOutcomeLifecycleVisitor.js";
import type { IComputationOutcomeLifecycleDirectiveConfiguration } from "../contracts/IComputationOutcomeLifecycleDirectiveBuilder.js";
import { DefaultEnterpriseComputationResolutionLifecycleOrchestratorImpl } from "../impl/DefaultEnterpriseComputationResolutionLifecycleOrchestratorImpl.js";
import { ComputationOutcomeLifecycleVisitorCollectorImpl } from "../impl/ComputationOutcomeLifecycleVisitorCollectorImpl.js";
import { PreProcessingComputationOutcomeLifecycleChainHandlerImpl } from "../impl/PreProcessingComputationOutcomeLifecycleChainHandlerImpl.js";
import { PostProcessingComputationOutcomeLifecycleChainHandlerImpl } from "../impl/PostProcessingComputationOutcomeLifecycleChainHandlerImpl.js";
import { DefaultComputationOutcomeLifecycleSpecificationValidatorImpl } from "../impl/DefaultComputationOutcomeLifecycleSpecificationValidatorImpl.js";
import { DefaultComputationOutcomeLifecycleDirectiveBuilderImpl } from "../impl/DefaultComputationOutcomeLifecycleDirectiveBuilderImpl.js";

let orchestratorInstance: IEnterpriseComputationResolutionLifecycleOrchestrator | null = null;
let infrastructureInitialized = false;

export class EnterpriseComputationResolutionLifecycleOrchestratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "EnterpriseComputationResolutionLifecycleOrchestratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-LIFECYCLE-ORCHESTRATOR-FACTORY-BEAN";

  static initializeLifecycleOrchestrationInfrastructure(
    directiveConfig?: IComputationOutcomeLifecycleDirectiveConfiguration,
  ): IEnterpriseComputationResolutionLifecycleOrchestrator {
    if (infrastructureInitialized && orchestratorInstance !== null) {
      return orchestratorInstance;
    }

    const config =
      directiveConfig ??
      new DefaultComputationOutcomeLifecycleDirectiveBuilderImpl(
        "DefaultLifecycleDirectiveBuilder",
        "1.0.0-DIRECTIVE-BUILDER",
      )
        .withVisitorRegistrationEnabled(true)
        .withValidationEnabled(true)
        .withChainOfResponsibilityEnabled(true)
        .withLifecycleStateTrackingEnabled(true)
        .withOrchestratorDescriptor("ENTERPRISE_RESOLUTION_LIFECYCLE_STANDARD")
        .build();

    const orchestrator = new DefaultEnterpriseComputationResolutionLifecycleOrchestratorImpl(
      "EnterpriseResolutionLifecycleOrchestrator",
      "1.0.0-LIFECYCLE-ORC",
    );

    if (config.isVisitorRegistrationEnabled) {
      const lifecycleVisitor = new ComputationOutcomeLifecycleVisitorCollectorImpl(
        "LifecycleAuditTrailVisitor",
        "1.0.0-VISITOR-AUDIT",
        "EnterpriseComputationOutcomeLifecycleAuditTrailCollector",
      );
      orchestrator.registerLifecycleVisitor(lifecycleVisitor);
    }

    if (config.isChainOfResponsibilityEnabled) {
      const preHandler = new PreProcessingComputationOutcomeLifecycleChainHandlerImpl();
      const postHandler = new PostProcessingComputationOutcomeLifecycleChainHandlerImpl();
      preHandler.setNextHandler(postHandler);
      orchestrator.registerLifecycleChainHandler(preHandler);
    }

    if (config.isValidationEnabled) {
      const outcomeNotNullValidator =
        new DefaultComputationOutcomeLifecycleSpecificationValidatorImpl(
          "ComputationOutcomeNotNullValidator",
          "1.0.0-VALIDATOR-NOTNULL",
          1,
          "Validates that the computed outcome is not null or undefined",
          (_v: number, result: string) => result !== null && result !== undefined && result !== "undefined",
          "VALIDATION_FAILURE:OUTCOME_IS_NULL",
          false,
        );
      orchestrator.registerLifecycleValidator(outcomeNotNullValidator);
    }

    orchestratorInstance = orchestrator;
    infrastructureInitialized = true;

    console.debug(
      `[${EnterpriseComputationResolutionLifecycleOrchestratorFactoryBeanFactory.FACTORY_BEAN_NAME} ` +
      `v${EnterpriseComputationResolutionLifecycleOrchestratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Enterprise resolution lifecycle orchestration infrastructure initialized: ` +
      `orchestrator=[${orchestrator.getOrchestratorName()} v${orchestrator.getOrchestratorVersion()}], ` +
      `descriptor=[${orchestrator.getOrchestratorDescriptor()}], ` +
      `visitors=[${orchestrator.getRegisteredVisitors().length}], ` +
      `validators=[${orchestrator.getRegisteredValidators().length}], ` +
      `chainHead=[${orchestrator.getChainHead()?.getHandlerName() ?? "null"}], ` +
      `config=[${config.toConfigurationDescriptor()}]`,
    );

    return orchestrator;
  }

  static getOrchestrator(): IEnterpriseComputationResolutionLifecycleOrchestrator | null {
    return orchestratorInstance;
  }

  static isInfrastructureInitialized(): boolean {
    return infrastructureInitialized;
  }

  static resetLifecycleOrchestrationInfrastructure(): void {
    orchestratorInstance = null;
    infrastructureInitialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseComputationResolutionLifecycleOrchestratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseComputationResolutionLifecycleOrchestratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static createBuilder(): DefaultComputationOutcomeLifecycleDirectiveBuilderImpl {
    return new DefaultComputationOutcomeLifecycleDirectiveBuilderImpl(
      "EnterpriseLifecycleDirectiveBuilderFactoryBean",
      "1.0.0-DIRECTIVE-BUILDER-FACTORY-BEAN",
    );
  }
}

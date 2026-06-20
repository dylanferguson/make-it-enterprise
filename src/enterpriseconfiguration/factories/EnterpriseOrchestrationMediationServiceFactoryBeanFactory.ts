import type { IEnterpriseOrchestrationMediationService } from "../contracts/IEnterpriseOrchestrationMediationService.js";
import type { IEnterpriseConfigurationDescriptor } from "../contracts/IEnterpriseConfigurationDescriptor.js";
import { FizzBuzzEnterpriseOrchestrationMediationServiceImpl } from "../mediation/FizzBuzzEnterpriseOrchestrationMediationServiceImpl.js";
import { EnterpriseConfigurationDescriptorParserFactoryBeanFactory } from "./EnterpriseConfigurationDescriptorParserFactoryBeanFactory.js";

export class EnterpriseOrchestrationMediationServiceFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseOrchestrationMediationServiceFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MEDIATION-FACTORY";

  private static mediationServiceSingleton: IEnterpriseOrchestrationMediationService | null = null;

  static createMediationService(enabled: boolean = true): IEnterpriseOrchestrationMediationService {
    if (EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton === null) {
      let mediationEnabled = enabled;
      try {
        const descriptor = EnterpriseConfigurationDescriptorParserFactoryBeanFactory.parseConfiguration();
        const mediationProperty = descriptor.getProperty("mediation.enabled");
        if (mediationProperty !== null) {
          mediationEnabled = mediationProperty.getValue() === "true";
        }
      } catch {
        console.debug(
          `[${EnterpriseOrchestrationMediationServiceFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
          `Configuration descriptor not available, using default mediation enabled=[${enabled}]`,
        );
      }
      EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton =
        new FizzBuzzEnterpriseOrchestrationMediationServiceImpl(mediationEnabled);
      console.debug(
        `[${EnterpriseOrchestrationMediationServiceFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseOrchestrationMediationServiceFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Enterprise orchestration mediation service created: ` +
        `service=[${EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton.getServiceName()} v${EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton.getServiceVersion()}], ` +
        `activeChain=[${EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton.getActiveHandlerChainDescriptor()}], ` +
        `handlerCount=[${EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton.getRegisteredHandlerCount()}], ` +
        `mediationEnabled=[${mediationEnabled}]`,
      );
    }
    return EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton;
  }

  static getMediationService(): IEnterpriseOrchestrationMediationService | null {
    return EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton;
  }

  static resetMediationService(): void {
    EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton = null;
  }

  static isServiceInitialized(): boolean {
    return EnterpriseOrchestrationMediationServiceFactoryBeanFactory.mediationServiceSingleton !== null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseOrchestrationMediationServiceFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseOrchestrationMediationServiceFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

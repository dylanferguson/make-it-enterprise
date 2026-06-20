import type { IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext } from "../../contracts/IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext.js";
import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "../../contracts/IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.js";
import type { IEnterpriseComputationGovernancePolicyEnforcementFacade } from "../../contracts/IEnterpriseComputationGovernancePolicyEnforcementFacade.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IValidationAwareResolutionFacadeDecorator } from "../../contracts/IValidationAwareResolutionFacadeDecorator.js";
import type { IInterceptionFilterChainResolutionFacadeDecorator } from "../../contracts/IInterceptionFilterChainResolutionFacadeDecorator.js";
import type { IConfigurationAwareResolutionFacadeDecorator } from "../../contracts/IConfigurationAwareResolutionFacadeDecorator.js";
import type { IEnterpriseModuloArithmeticConfigurationProvider } from "../../contracts/IEnterpriseModuloArithmeticConfigurationProvider.js";
import type { IServiceLocator } from "../../contracts/IServiceLocator.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityManager } from "../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";

export class DefaultFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContextImpl
  implements IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext
{
  private static readonly CONTEXT_NAME = "DefaultFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext";
  private static readonly CONTEXT_VERSION = "1.0.0-CONTEXT-SERVICE-LOCATOR-AWARE";

  private readonly serviceLocator: IServiceLocator;
  private readonly publicApiDelegate: IEnterpriseFizzBuzzPublicApiResolutionDelegate;
  private readonly mediationOrchestrator: IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator;
  private readonly governanceEnforcementFacade: IEnterpriseComputationGovernancePolicyEnforcementFacade;
  private readonly baseResolutionFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly validationAwareDecorator: IValidationAwareResolutionFacadeDecorator;
  private readonly interceptionFilterChainDecorator: IInterceptionFilterChainResolutionFacadeDecorator;
  private readonly configurationAwareDecorator: IConfigurationAwareResolutionFacadeDecorator;
  private readonly configurationProvider: IEnterpriseModuloArithmeticConfigurationProvider;
  private readonly compositeValueResolver: ICompositeValueResolver;
  private readonly strategyChainOfResponsibilityManager: IFizzBuzzResolutionStrategyChainOfResponsibilityManager;

  constructor(
    serviceLocator: IServiceLocator,
    publicApiDelegate: IEnterpriseFizzBuzzPublicApiResolutionDelegate,
    mediationOrchestrator: IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator,
    governanceEnforcementFacade: IEnterpriseComputationGovernancePolicyEnforcementFacade,
    baseResolutionFacade: IFizzBuzzSingleValueResolutionFacade,
    validationAwareDecorator: IValidationAwareResolutionFacadeDecorator,
    interceptionFilterChainDecorator: IInterceptionFilterChainResolutionFacadeDecorator,
    configurationAwareDecorator: IConfigurationAwareResolutionFacadeDecorator,
    configurationProvider: IEnterpriseModuloArithmeticConfigurationProvider,
    compositeValueResolver: ICompositeValueResolver,
    strategyChainOfResponsibilityManager: IFizzBuzzResolutionStrategyChainOfResponsibilityManager,
  ) {
    this.serviceLocator = serviceLocator;
    this.publicApiDelegate = publicApiDelegate;
    this.mediationOrchestrator = mediationOrchestrator;
    this.governanceEnforcementFacade = governanceEnforcementFacade;
    this.baseResolutionFacade = baseResolutionFacade;
    this.validationAwareDecorator = validationAwareDecorator;
    this.interceptionFilterChainDecorator = interceptionFilterChainDecorator;
    this.configurationAwareDecorator = configurationAwareDecorator;
    this.configurationProvider = configurationProvider;
    this.compositeValueResolver = compositeValueResolver;
    this.strategyChainOfResponsibilityManager = strategyChainOfResponsibilityManager;
  }

  getServiceLocator(): IServiceLocator {
    return this.serviceLocator;
  }

  getPublicApiDelegate(): IEnterpriseFizzBuzzPublicApiResolutionDelegate {
    return this.publicApiDelegate;
  }

  getMediationOrchestrator(): IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator {
    return this.mediationOrchestrator;
  }

  getGovernanceEnforcementFacade(): IEnterpriseComputationGovernancePolicyEnforcementFacade {
    return this.governanceEnforcementFacade;
  }

  getBaseResolutionFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.baseResolutionFacade;
  }

  getValidationAwareDecorator(): IValidationAwareResolutionFacadeDecorator {
    return this.validationAwareDecorator;
  }

  getInterceptionFilterChainDecorator(): IInterceptionFilterChainResolutionFacadeDecorator {
    return this.interceptionFilterChainDecorator;
  }

  getConfigurationAwareDecorator(): IConfigurationAwareResolutionFacadeDecorator {
    return this.configurationAwareDecorator;
  }

  getConfigurationProvider(): IEnterpriseModuloArithmeticConfigurationProvider {
    return this.configurationProvider;
  }

  getCompositeValueResolver(): ICompositeValueResolver {
    return this.compositeValueResolver;
  }

  getStrategyChainOfResponsibilityManager(): IFizzBuzzResolutionStrategyChainOfResponsibilityManager {
    return this.strategyChainOfResponsibilityManager;
  }

  getContextName(): string {
    return DefaultFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContextImpl.CONTEXT_NAME;
  }

  getContextVersion(): string {
    return DefaultFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContextImpl.CONTEXT_VERSION;
  }
}

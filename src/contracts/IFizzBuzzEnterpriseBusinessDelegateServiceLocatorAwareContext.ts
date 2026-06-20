import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "./IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator } from "./IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.js";
import type { IEnterpriseComputationGovernancePolicyEnforcementFacade } from "./IEnterpriseComputationGovernancePolicyEnforcementFacade.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "./IFizzBuzzSingleValueResolutionFacade.js";
import type { IValidationAwareResolutionFacadeDecorator } from "./IValidationAwareResolutionFacadeDecorator.js";
import type { IInterceptionFilterChainResolutionFacadeDecorator } from "./IInterceptionFilterChainResolutionFacadeDecorator.js";
import type { IConfigurationAwareResolutionFacadeDecorator } from "./IConfigurationAwareResolutionFacadeDecorator.js";
import type { IEnterpriseModuloArithmeticConfigurationProvider } from "./IEnterpriseModuloArithmeticConfigurationProvider.js";
import type { IServiceLocator } from "./IServiceLocator.js";
import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityManager } from "./IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";

export interface IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext {
  getServiceLocator(): IServiceLocator;
  getPublicApiDelegate(): IEnterpriseFizzBuzzPublicApiResolutionDelegate;
  getMediationOrchestrator(): IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator;
  getGovernanceEnforcementFacade(): IEnterpriseComputationGovernancePolicyEnforcementFacade;
  getBaseResolutionFacade(): IFizzBuzzSingleValueResolutionFacade;
  getValidationAwareDecorator(): IValidationAwareResolutionFacadeDecorator;
  getInterceptionFilterChainDecorator(): IInterceptionFilterChainResolutionFacadeDecorator;
  getConfigurationAwareDecorator(): IConfigurationAwareResolutionFacadeDecorator;
  getConfigurationProvider(): IEnterpriseModuloArithmeticConfigurationProvider;
  getCompositeValueResolver(): ICompositeValueResolver;
  getStrategyChainOfResponsibilityManager(): IFizzBuzzResolutionStrategyChainOfResponsibilityManager;
}

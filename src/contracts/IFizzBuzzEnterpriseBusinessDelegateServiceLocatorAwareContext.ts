import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "../contracts/IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.js";
import type { IEnterpriseComputationGovernancePolicyEnforcementFacade } from "../contracts/IEnterpriseComputationGovernancePolicyEnforcementFacade.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IValidationAwareResolutionFacadeDecorator } from "../contracts/IValidationAwareResolutionFacadeDecorator.js";
import type { IInterceptionFilterChainResolutionFacadeDecorator } from "../contracts/IInterceptionFilterChainResolutionFacadeDecorator.js";
import type { IConfigurationAwareResolutionFacadeDecorator } from "../contracts/IConfigurationAwareResolutionFacadeDecorator.js";
import type { IEnterpriseModuloArithmeticConfigurationProvider } from "../contracts/IEnterpriseModuloArithmeticConfigurationProvider.js";
import type { IServiceLocator } from "../contracts/IServiceLocator.js";
import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";
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

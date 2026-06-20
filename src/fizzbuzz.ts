import {
  FizzBuzzEnterpriseApplicationContextFactoryBean,
} from "./impl/factories/FizzBuzzEnterpriseApplicationContextFactoryBeanFactory.js";
import {
  EnterpriseApplicationBootstrapInitializerFactoryBean,
} from "./impl/factories/EnterpriseApplicationBootstrapInitializerFactoryBean.js";
import { DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory } from "./impl/factories/DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.js";
import type { IEnterpriseDeploymentAwareBootstrapDecorator } from "./contracts/IEnterpriseDeploymentAwareBootstrapDecorator.js";
import type {
  IFizzBuzzSingleValueResolutionFacade,
} from "./contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type {
  IValidationAwareResolutionFacadeDecorator,
} from "./contracts/IValidationAwareResolutionFacadeDecorator.js";
import {
  FizzBuzzResolutionFacadeConfigurationProfile,
} from "./impl/factories/FizzBuzzResolutionFacadeFactoryBeanFactory.js";
import { FizzBuzzResolutionFacadeFactoryBeanFactory } from "./impl/factories/FizzBuzzResolutionFacadeFactoryBeanFactory.js";
import { DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory } from "./impl/factories/DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.js";
import { DivisibleByExpressionFallbackComputationStrategyChainFactoryBean } from "./impl/factories/DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.js";
import { StandardEnterpriseFizzBuzzSlaMonitorImpl } from "./impl/slo/StandardEnterpriseFizzBuzzSlaMonitorImpl.js";
import { EnterpriseServiceBusChannelImpl } from "./impl/bus/EnterpriseServiceBusChannelImpl.js";
import { StandardEnterpriseServiceBusMessageRouterImpl } from "./impl/bus/StandardEnterpriseServiceBusMessageRouterImpl.js";
import { DefaultEnterpriseServiceBusChannelBindingImpl } from "./impl/bus/DefaultEnterpriseServiceBusChannelBindingImpl.js";
import { EnterpriseRemainderComputationProtocolStackFactoryBeanFactory } from "./impl/protocol/EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.js";
import { ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./impl/factories/ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import { DivisibilityEvaluationSupervisionChainFactoryBean } from "./impl/factories/DivisibilityEvaluationSupervisionChainFactoryBean.js";
import { DivisibilityValidationEnforcementGateFactoryBeanFactory } from "./impl/validation/DivisibilityValidationEnforcementGateFactoryBeanFactory.js";
import { DefaultValidationEnforcementMetricsCollectorImpl } from "./impl/validation/DefaultValidationEnforcementMetricsCollectorImpl.js";
import { MessagePropertyResolutionChainFactoryBeanFactory } from "./impl/factories/MessagePropertyResolutionChainFactoryBeanFactory.js";
import { MessageTemplateCodecProviderFactoryBeanFactory } from "./impl/factories/MessageTemplateCodecProviderFactoryBeanFactory.js";
import {
  InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory,
  InterceptionFilterChainDecoratorConfigurationProfile,
} from "./impl/factories/InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.js";
import {
  EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory,
  EnterpriseComputationGovernanceFacadeConfigurationProfile,
} from "./impl/governance/EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory.js";
import type { IEnterpriseComputationGovernancePolicyEnforcementFacade } from "./contracts/IEnterpriseComputationGovernancePolicyEnforcementFacade.js";
import { EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory, DivisibilityResolutionFacadeConfigurationProfile } from "./impl/factories/EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.js";
import { EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory } from "./impl/factories/EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.js";
import { DefaultConfigurationAwareResolutionFacadeDecoratorImpl } from "./impl/decorators/DefaultConfigurationAwareResolutionFacadeDecoratorImpl.js";
import {
  EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory,
  DirectiveResolutionMediationOrchestratorConfigurationProfile,
} from "./impl/factories/EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator } from "./contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.js";
import { JmsInfrastructureFactoryBeanFactory } from "./impl/jms/factories/JmsInfrastructureFactoryBeanFactory.js";
import { StandardFizzBuzzComputationPipelineBuilderFactoryBeanFactory } from "./builders/factories/StandardFizzBuzzComputationPipelineBuilderFactoryBeanFactory.js";
import { StandardFizzBuzzRangeIteratorFactoryBeanFactory } from "./iterators/factories/StandardFizzBuzzRangeIteratorFactoryBeanFactory.js";
import type { IFizzBuzzComputationPipelineProduct } from "./builders/contracts/IFizzBuzzComputationPipelineBuilder.js";
import type { IFizzBuzzRangeIterator } from "./iterators/contracts/IFizzBuzzRangeIterator.js";
import { FizzBuzzPipelineProductConfigurationProviderFactoryBeanFactory } from "./builders/factories/FizzBuzzPipelineProductConfigurationProviderFactoryBeanFactory.js";
import { DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory } from "./divisibility/factories/DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.js";
import { DivisibilityModuloEvaluationChainHandlerVisitorImpl } from "./divisibility/visitors/DivisibilityModuloEvaluationChainHandlerVisitorImpl.js";
import { LocalizedMessageResolverFactoryBeanFactory } from "./localization/impl/factories/LocalizedMessageResolverFactoryBeanFactory.js";
import { LocalizedMessageResolutionChainHandlerFactoryBeanFactory } from "./localization/impl/factories/LocalizedMessageResolutionChainHandlerFactoryBeanFactory.js";
import { LocaleResolutionStrategyFactoryBeanFactory } from "./localization/impl/factories/LocaleResolutionStrategyFactoryBeanFactory.js";
import type { ILocalizedMessageResolver } from "./localization/contracts/ILocalizedMessageResolver.js";
import { DefaultLocaleResolutionStrategyImpl } from "./localization/impl/locales/DefaultLocaleResolutionStrategyImpl.js";
import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "./contracts/IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";
import { EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory } from "./impl/publicapi/factories/EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.js";
import type { IFizzBuzzEnterpriseBusinessDelegate } from "./contracts/IFizzBuzzEnterpriseBusinessDelegate.js";
import type { IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext } from "./contracts/IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext.js";
import { FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory } from "./impl/businessdelegates/factories/FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.js";
import { DefaultFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContextImpl } from "./impl/businessdelegates/DefaultFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContextImpl.js";
import { DivisibilitySpecificationStrategyFactoryBeanFactory } from "./specification/factories/DivisibilitySpecificationStrategyFactoryBeanFactory.js";
import { ModuloArithmeticCommandInvokerFactoryBeanFactory } from "./moduloarithmeticcommand/factories/ModuloArithmeticCommandInvokerFactoryBeanFactory.js";
import { TemplateMethodResolutionChainHandlerFactoryBeanFactory } from "./templatemethod/factories/TemplateMethodResolutionChainHandlerFactoryBeanFactory.js";
import { EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory } from "./visitortrail/factories/EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.js";
import type { IEnterpriseFizzBuzzResolutionAuditTrailVisitor } from "./visitortrail/contracts/IEnterpriseFizzBuzzResolutionAuditTrailVisitor.js";
import type { IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler } from "./templatemethod/contracts/IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler.js";
import { FizzBuzzRangeItemReaderFactoryBeanFactory } from "./batch/factories/FizzBuzzRangeItemReaderFactoryBeanFactory.js";
import { FizzBuzzSingleValueItemProcessorFactoryBeanFactory } from "./batch/factories/FizzBuzzSingleValueItemProcessorFactoryBeanFactory.js";
import { FizzBuzzResultItemWriterFactoryBeanFactory } from "./batch/factories/FizzBuzzResultItemWriterFactoryBeanFactory.js";
import { FizzBuzzBatchJobConfigurationFactoryBeanFactory } from "./batch/factories/FizzBuzzBatchJobConfigurationFactoryBeanFactory.js";
import { FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory } from "./batch/factories/FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory.js";
import { FizzBuzzBatchChunkOrientedJobFactoryBeanFactory } from "./batch/factories/FizzBuzzBatchChunkOrientedJobFactoryBeanFactory.js";
import type { IBatchChunkOrientedJob } from "./batch/contracts/index.js";
import { FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory } from "./impl/chains/resolution/factories/FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityManager } from "./contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityManager.js";
import type { IEnterpriseFizzBuzzResolutionStrategySelectorVisitor } from "./contracts/IEnterpriseFizzBuzzResolutionStrategySelectorVisitor.js";
import { ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory } from "./impl/proxies/factories/ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory.js";
import type { IServiceLocatorManagedBusinessDelegateProxy } from "./contracts/IServiceLocatorManagedBusinessDelegateProxy.js";
import { ServiceLocatorFactoryBeanFactory } from "./impl/factories/ServiceLocatorFactoryBean.js";
import type { IServiceLocator } from "./contracts/IServiceLocator.js";
import { EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory } from "./document/impl/factories/EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.js";
import { EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory } from "./document/impl/factories/EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.js";
import { EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory } from "./document/impl/factories/EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.js";
import { EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory } from "./document/impl/factories/EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.js";
import { EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./document/impl/factories/EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import { EnterpriseFizzBuzzDocumentRegistryImpl } from "./document/impl/EnterpriseFizzBuzzDocumentRegistryImpl.js";
import { DocumentNodeType } from "./document/contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IDocumentAwareResolutionFacadeDecorator } from "./document/contracts/IDocumentAwareResolutionFacadeDecorator.js";
import { FizzBuzzDocumentNodeImpl } from "./document/impl/FizzBuzzDocumentNodeImpl.js";
import { NumberDocumentNodeImpl } from "./document/impl/NumberDocumentNodeImpl.js";
import { UnresolvedDocumentNodeImpl } from "./document/impl/UnresolvedDocumentNodeImpl.js";
import { ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory } from "./enterprisemodulo/factories/ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.js";
import type { IModularArithmeticDivisibilityResolutionMediationVisitor } from "./enterprisemodulo/contracts/IModularArithmeticDivisibilityResolutionMediationVisitor.js";
import { EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory } from "./expressionengine/factories/EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.js";
import { EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory } from "./expressionengine/factories/EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.js";
import { DivisibilityExpressionFactoryBeanFactory } from "./expressionengine/factories/DivisibilityExpressionFactoryBeanFactory.js";
import { CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory } from "./cache/factories/CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.js";
import { EnterpriseComputationCacheManagerFactoryBeanFactory } from "./cache/factories/EnterpriseComputationCacheManagerFactoryBeanFactory.js";
import { AopInfrastructureFactoryBeanFactory as AopInfrastructureBeanFactory } from "./aop/factories/AopInfrastructureFactoryBeanFactory.js";
import { AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory } from "./aop/factories/AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.js";
import { ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory } from "./execution/factories/ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.js";
import { EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory } from "./computedoutcome/factories/EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.js";
import { EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory } from "./computedoutcome/factories/EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.js";
import { EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./computedoutcome/factories/EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import type { IPreEvaluationAwareResolutionFacadeDecorator } from "./computedoutcome/contracts/index.js";
import { EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory } from "./outputcomposite/factories/EnterpriseOutputCompositeFactoryBeanFactory.js";
import { JmxInfrastructureFactoryBeanFactory } from "./jmx/factories/JmxInfrastructureFactoryBeanFactory.js";
import { EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory } from "./resolutiondelegation/factories/EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory.js";
import { ResolutionDelegationVisitorFactoryBeanFactory } from "./resolutiondelegation/visitors/factories/ResolutionDelegationVisitorFactoryBeanFactory.js";
import { EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory } from "./resolutiondelegation/factories/EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory.js";
import { DefaultResolutionDelegationConfiguratorBuilderImpl } from "./resolutiondelegation/builders/impl/DefaultResolutionDelegationConfiguratorBuilderImpl.js";
import { ComputationStateInfrastructureInitializerFactoryBeanFactory } from "./computationstate/factories/ComputationStateInfrastructureInitializerFactoryBeanFactory.js";
import { ComputationStateMachineFactoryBeanFactory } from "./computationstate/factories/ComputationStateMachineFactoryBeanFactory.js";
import { ComputationStateMachineMediatorFactoryBeanFactory } from "./computationstate/factories/ComputationStateMachineMediatorFactoryBeanFactory.js";
import { ComputationStateTransitionVisitorFactoryBeanFactory } from "./computationstate/factories/ComputationStateTransitionVisitorFactoryBeanFactory.js";
import { ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./computationstate/factories/ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import type { IComputationStateMachineAwareResolutionFacadeDecorator } from "./computationstate/contracts/IComputationStateMachineAwareResolutionFacadeDecorator.js";
import { EnterpriseComputedOutcomeEntityInfrastructureInitializerFactoryBeanFactory } from "./computedoutcome/factories/EnterpriseComputedOutcomeEntityInfrastructureInitializerFactoryBeanFactory.js";
import { EnterpriseComputedOutcomeEntityAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./computedoutcome/factories/EnterpriseComputedOutcomeEntityAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import { EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory } from "./computedoutcome/factories/EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory.js";
import { EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory } from "./computedoutcome/factories/EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory.js";
import { EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory } from "./computedoutcome/factories/EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory.js";
import { EnterpriseTransactionInfrastructureInitializerFactoryBeanFactory } from "./transactions/factories/EnterpriseTransactionInfrastructureInitializerFactoryBeanFactory.js";
import { EnterpriseTransactionContextPropagatingDecoratorFactoryBeanFactory, TransactionPropagationDecoratorConfigurationProfile } from "./transactions/factories/EnterpriseTransactionContextPropagatingDecoratorFactoryBeanFactory.js";
import type { IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator } from "./transactions/contracts/IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator.js";
import { AbstractDivisibilityStrategyProviderFactoryBeanFactory } from "./abstractdivisibilitystrategyprovider/factories/AbstractDivisibilityStrategyProviderFactoryBeanFactory.js";
import { ModuloEvaluationStrategyFactoryBeanFactory } from "./abstractdivisibilitystrategyprovider/factories/ModuloEvaluationStrategyFactoryBeanFactory.js";
import { DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory } from "./abstractdivisibilitystrategyprovider/factories/DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.js";
import { DivisibilityStrategyEvaluatorFactoryBeanFactory } from "./abstractdivisibilitystrategyprovider/factories/DivisibilityStrategyEvaluatorFactoryBeanFactory.js";
import { AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./impl/factories/AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import type { IFizzBuzzPipelineManager } from "./pipeline/contracts/IFizzBuzzPipelineManager.js";
import type { IPipelineManagerResolutionStrategySelector } from "./pipelineresolution/contracts/IPipelineManagerResolutionStrategySelector.js";
import { PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory } from "./pipelineresolution/factories/PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory.js";
import { FizzBuzzPipelineManagerFactoryBeanFactory, FizzBuzzPipelineManagerConfigurationProfile } from "./pipeline/factories/FizzBuzzPipelineManagerFactoryBeanFactory.js";
import { JndiInitialContextFactoryBeanFactory } from "./jndi/factories/JndiInitialContextFactoryBeanFactory.js";
import type { IJndiInitialContext } from "./jndi/contracts/IJndiInitialContext.js";
import { RmiRegistryFactoryBeanFactory } from "./rmi/factories/RmiRegistryFactoryBeanFactory.js";
import { FizzBuzzComputationRmiStubFactoryBeanFactory } from "./rmi/factories/FizzBuzzComputationRmiStubFactoryBeanFactory.js";
import type { IRmiRemoteStub } from "./rmi/contracts/IRmiRemoteStub.js";
import { EjbHomeFactoryBeanFactory } from "./ejb/factories/EjbHomeFactoryBeanFactory.js";
import { EjbJndiBindingFactoryBeanFactory } from "./ejb/factories/EjbJndiBindingFactoryBeanFactory.js";
import type { IEjbJndiBinding } from "./ejb/contracts/IEjbJndiBinding.js";
import { CorbaNamingServiceFactoryBeanFactory } from "./corba/factories/CorbaNamingServiceFactoryBeanFactory.js";
import type { ICorbaObjectReference } from "./corba/contracts/ICorbaObjectReference.js";
import { EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory } from "./impl/factories/EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.js";
import type { IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator } from "./contracts/IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator.js";
import { FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory, FizzBuzzEnterpriseServiceEndpointConfigurationProfile } from "./endpoint/factories/FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.js";
import { FizzBuzzEndpointAwareServiceActivatorImpl } from "./endpoint/FizzBuzzEndpointAwareServiceActivatorImpl.js";
import { ComputationResultPostProcessorArchitectureFactoryBeanFactory } from "./resultpostprocessing/factories/ComputationResultPostProcessorArchitectureFactoryBeanFactory.js";
import { PostProcessorAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./resultpostprocessing/factories/PostProcessorAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import { EnterpriseStrategyLookupServiceFactoryBeanFactory } from "./strategylookupservice/factories/EnterpriseStrategyLookupServiceFactoryBeanFactory.js";
import { EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory } from "./strategylookupservice/factories/EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.js";
import { EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./strategylookupservice/factories/EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import type { IEnterpriseStrategyLookupService } from "./strategylookupservice/contracts/IEnterpriseStrategyLookupService.js";
import { EnterpriseConfigurationDescriptorParserFactoryBeanFactory } from "./enterpriseconfiguration/factories/EnterpriseConfigurationDescriptorParserFactoryBeanFactory.js";
import { EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory } from "./enterpriseconfiguration/factories/EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.js";
import { EnterpriseOrchestrationMediationServiceFactoryBeanFactory } from "./enterpriseconfiguration/factories/EnterpriseOrchestrationMediationServiceFactoryBeanFactory.js";
import { EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./enterpriseconfiguration/factories/EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import { EnterpriseComputationResolutionMediatorArchitectureFactoryBeanFactory } from "./computationadapter/factories/EnterpriseComputationResolutionMediatorArchitectureFactoryBeanFactory.js";
import { ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./computationadapter/factories/ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import { ComputationResolutionAdapterRegistryFactoryBeanFactory } from "./computationadapter/factories/ComputationResolutionAdapterRegistryFactoryBeanFactory.js";
import { DivisorSpecificComputationAdapterFactoryBeanFactory } from "./computationadapter/factories/DivisorSpecificComputationAdapterFactoryBeanFactory.js";
import type { IEnterpriseComputationResolutionMediatorArchitecture } from "./computationadapter/contracts/IEnterpriseComputationResolutionMediatorArchitecture.js";

let messagePropertyConfigurationInitialized = false;
let jmsInfrastructureInitialized = false;

const BOOTSTRAP_GATE_INITIALIZED: boolean = ((): boolean => {
  let deploymentDecorator: IEnterpriseDeploymentAwareBootstrapDecorator | null = null;
  if (!EnterpriseApplicationBootstrapInitializerFactoryBean.isInitialized()) {
    const initializer = EnterpriseApplicationBootstrapInitializerFactoryBean.createBootstrapInitializer(true);
    deploymentDecorator =
      DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.createDecorator(initializer);
  } else {
    deploymentDecorator =
      DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.getDecorator();
  }
  if (deploymentDecorator !== null && !deploymentDecorator.getDeploymentPlan().getRegisteredDescriptorNames().length) {
    deploymentDecorator.applyDeploymentConfiguration();
    console.debug(
      `[BootstrapGate] Deployment descriptor-driven configuration applied: ` +
      `${deploymentDecorator.getEntityBeanRegistrationCount()} entity bean(s), ` +
      `${deploymentDecorator.getRegisteredJndiBindingCount()} JNDI binding(s)`,
    );
  }
  if (!FizzBuzzEnterpriseApplicationContextFactoryBean.isContextInitialized()) {
    FizzBuzzEnterpriseApplicationContextFactoryBean.createApplicationContext("STANDARD");
  }
  if (!DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.isEnterpriseSupervisorChainInitialized()) {
    DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.initializeEnterpriseSupervisorChain();
  }
  if (!DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.isChainInitialized()) {
    DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.buildSingletonFallbackComputationChain(true);
  }
  if (!DivisibilityValidationEnforcementGateFactoryBeanFactory.getValidationGate()) {
    DivisibilityValidationEnforcementGateFactoryBeanFactory.createValidationGate("STANDARD_STRICT");
  }
  if (!messagePropertyConfigurationInitialized) {
    const propertyResolutionChain = MessagePropertyResolutionChainFactoryBeanFactory.createResolutionChain();
    const codecProvider = MessageTemplateCodecProviderFactoryBeanFactory.createCodecProvider(propertyResolutionChain);
    console.debug(
      `[MessageConfigurationInfrastructure] Enterprise message template codec initialized: ` +
      `chain=[${propertyResolutionChain.getChainName()} v${propertyResolutionChain.getChainVersion()}], ` +
      `provider=[${codecProvider.getProviderName()} v${codecProvider.getProviderVersion()}], ` +
      `sources=[${propertyResolutionChain.getRegisteredSourceNames().join(", ")}]`,
    );
    messagePropertyConfigurationInitialized = true;
  }
  {
    const metricsCollector = new DefaultValidationEnforcementMetricsCollectorImpl();
    console.debug(
      `[ValidationEnforcementInfrastructure] Validation gate initialized: ` +
      `metricsCollector=[${metricsCollector.getMetricsCollectorName()} v${metricsCollector.getMetricsCollectorVersion()}], ` +
      `gateType=[${DivisibilityValidationEnforcementGateFactoryBeanFactory.getValidationGate()?.getGateImplementationType() ?? "UNKNOWN"}]`,
    );
    const slaMonitor = new StandardEnterpriseFizzBuzzSlaMonitorImpl(50);
    const busChannel = new EnterpriseServiceBusChannelImpl("fizzbuzz-computation-channel", "COMPUTATION_EVENT_CHANNEL", true);
    const busRouter = new StandardEnterpriseServiceBusMessageRouterImpl();
    busRouter.registerChannel(busChannel);
    const busBinding = new DefaultEnterpriseServiceBusChannelBindingImpl(busChannel, busRouter);
    console.debug(
      `[BootstrapGate] Enterprise infrastructure initialized: ` +
      `slaMonitor=[${slaMonitor.getMonitorName()} v${slaMonitor.getMonitorVersion()}], ` +
      `esbChannel=[${busChannel.getChannelName()}], ` +
      `esbRouter=[${busRouter.getRouterName()} v${busRouter.getRouterVersion()}], ` +
      `esbBinding=[${busBinding.getBindingName()} v${busBinding.getBindingVersion()}]`,
    );
  }
  {
    const divisibilityFacade = EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.createDivisibilityResolutionFacade(
      DivisibilityResolutionFacadeConfigurationProfile.FULLY_DECORATED,
    );
    console.debug(
      `[DivisibilityResolutionInfrastructure] Enterprise divisibility resolution facade initialized: ` +
      `facade=[${divisibilityFacade.getFacadeName()} v${divisibilityFacade.getFacadeVersion()}], ` +
      `strategy=[${divisibilityFacade.getResolutionStrategyDescription()}]`,
    );
  }
  {
    const supervisionChain = DivisibilityEvaluationSupervisionChainFactoryBean.createSupervisionChain(true, true, true);
    console.debug(
      `[DivisibilityEvaluationSupervisionInfrastructure] Enterprise divisibility evaluation supervision chain initialized: ` +
      `chain=[${supervisionChain.getChainName()} v${supervisionChain.getChainVersion()}], ` +
      `registeredLinks=[${supervisionChain.getRegisteredLinkCount()}], ` +
      `factoryBean=[${DivisibilityEvaluationSupervisionChainFactoryBean.getFactoryBeanName()} v${DivisibilityEvaluationSupervisionChainFactoryBean.getFactoryBeanVersion()}]`,
    );
  }
  {
    const configurationProvider = EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.createConfigurationProvider();
    console.debug(
      `[ModuloArithmeticConfigurationInfrastructure] Enterprise modulo arithmetic configuration provider initialized: ` +
      `provider=[${configurationProvider.getConfigurationProviderName()} v${configurationProvider.getConfigurationProviderVersion()}], ` +
      `profile=[${configurationProvider.getConfigurationProfile()}], ` +
      `divisors=[${configurationProvider.getDivisorConstants().join(", ")}]`,
    );
  }
  {
    const divisibilityProvider = DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.initializeProviderInfrastructure();
    const registeredDivisors = divisibilityProvider.getRegisteredDivisors();
    const chainVisitor = new DivisibilityModuloEvaluationChainHandlerVisitorImpl();
    const provider = DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.getProvider();
    const registry = DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.getRegistry();
    console.debug(
      `[DivisibilityModuloEvaluationInfrastructure] Abstract divisibility strategy provider infrastructure initialized: ` +
      `provider=[${provider?.getProviderName() ?? "N/A"} v${provider?.getProviderVersion() ?? "N/A"}], ` +
      `registry=[${registry?.getRegistryName() ?? "N/A"} v${registry?.getRegistryVersion() ?? "N/A"}], ` +
      `registeredFactoryBeans=[${registry?.getFactoryBeanCount() ?? 0}], ` +
      `divisors=[${registeredDivisors.join(", ")}], ` +
      `chainVisitor=[${chainVisitor.getVisitorName()} v${chainVisitor.getVisitorVersion()}]`,
    );
  }
  if (!EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory.getCurrentFacade()) {
    const governanceFacade = EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory.createGovernanceEnforcementFacade(
      EnterpriseComputationGovernanceFacadeConfigurationProfile.STANDARD,
    );
    console.debug(
      `[BootstrapGate] Enterprise computation governance enforcement facade initialized: ` +
      `facade=[${governanceFacade.getFacadeName()} v${governanceFacade.getFacadeVersion()}], ` +
      `gate=[${governanceFacade.getEnforcementGate().getGateName()} v${governanceFacade.getEnforcementGate().getGateVersion()}], ` +
      `registry=[${governanceFacade.getPolicyRegistry().getRegistryName()} v${governanceFacade.getPolicyRegistry().getRegistryVersion()}], ` +
      `visitor=[${governanceFacade.getValidationVisitor().getVisitorName()} v${governanceFacade.getValidationVisitor().getVisitorVersion()}]`,
    );
  }
  if (!EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.getOrchestrator()) {
    const mediationOrchestrator = EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.createOrchestrator(
      DirectiveResolutionMediationOrchestratorConfigurationProfile.STANDARD,
    );
    console.debug(
      `[BootstrapGate] Directive resolution mediation orchestrator initialized: ` +
      `orchestrator=[${mediationOrchestrator.getMediationOrchestratorName()} v${mediationOrchestrator.getMediationOrchestratorVersion()}], ` +
      `strategies=[${mediationOrchestrator.getRegisteredMediationStrategyNames().join(", ")}], ` +
      `activeStrategy=[${mediationOrchestrator.getActiveMediationStrategyName()}]`,
    );
  }
  if (!EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.isFactoryInitialized()) {
    const docBuilder = EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.createBuilder();
    const docVisitor = EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.createVisitor();
    const docRenderer = EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.createRenderer();
    const docRegistry = EnterpriseFizzBuzzDocumentRegistryFactoryBeanFactory.createRegistry();
    docRegistry.registerDocumentNodeType(
      DocumentNodeType.FIZZBUZZ_COMPOSITE,
      () => new FizzBuzzDocumentNodeImpl(0, ""),
    );
    docRegistry.registerDocumentNodeType(
      DocumentNodeType.NUMBER,
      () => new NumberDocumentNodeImpl(0, ""),
    );
    docRegistry.registerDocumentNodeType(
      DocumentNodeType.UNRESOLVED,
      () => new UnresolvedDocumentNodeImpl(0, ""),
    );
    console.debug(
      `[DocumentInfrastructure] Enterprise computation result document model infrastructure initialized: ` +
      `builder=[${docBuilder.getBuilderName()} v${docBuilder.getBuilderVersion()}], ` +
      `visitor=[${docVisitor.getVisitorName()} v${docVisitor.getVisitorVersion()}], ` +
      `renderer=[${docRenderer.getRendererName()} v${docRenderer.getRendererVersion()}], ` +
      `registry=[${docRegistry.getRegistryName()} v${docRegistry.getRegistryVersion()}], ` +
      `registeredNodeTypes=[${docRegistry.getRegisteredNodeTypes().join(", ")}]`,
    );
  }
  if (!EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.isInitialized()) {
    EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.initializeFactoryBean();
    const stackFactory = EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.getOrCreateStackFactory();
    const protocolStack = EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.getOrCreateDefaultProtocolStack();
    console.debug(
      `[BootstrapGate] Enterprise remainder computation protocol stack initialized: ` +
      `factory=[${stackFactory.getFactoryName()} v${stackFactory.getFactoryVersion()}], ` +
      `stack=[${protocolStack.getStackName()} v${protocolStack.getStackVersion()}], ` +
      `layers=[${protocolStack.getRegisteredLayerCount()}], ` +
      `layerIds=[${protocolStack.getRegisteredLayers().map((l) => `L${l.getLayerNumber()}:${l.getLayerIdentifier()}`).join(", ")}]`,
    );
  }
  if (!jmsInfrastructureInitialized) {
    const context = FizzBuzzEnterpriseApplicationContextFactoryBean.getApplicationContext();
    if (context !== null && context.isInitialized()) {
      const namingContext = (context as any).getNamingContext?.() ?? context as any;
      const jmsInitialized = JmsInfrastructureFactoryBeanFactory.initializeJmsInfrastructure(namingContext);
      if (jmsInitialized) {
        const cf = JmsInfrastructureFactoryBeanFactory.getConnectionFactory();
        const queue = JmsInfrastructureFactoryBeanFactory.getRequestQueue();
        const topic = JmsInfrastructureFactoryBeanFactory.getResultTopic();
        const mdbContainer = JmsInfrastructureFactoryBeanFactory.getMdbContainer();
        const binder = JmsInfrastructureFactoryBeanFactory.getAdministeredObjectBinder();
        console.debug(
          `[JmsInfrastructure] Enterprise JMS messaging infrastructure initialized: ` +
          `connectionFactory=[${cf?.getConnectionFactoryName() ?? "N/A"} v${cf?.getConnectionFactoryVersion() ?? "N/A"}], ` +
          `requestQueue=[${queue?.getDestinationName() ?? "N/A"}@${queue?.getJndiName() ?? "N/A"}], ` +
          `resultTopic=[${topic?.getDestinationName() ?? "N/A"}@${topic?.getJndiName() ?? "N/A"}], ` +
          `mdbContainer=[${mdbContainer?.getContainerName() ?? "N/A"} v${mdbContainer?.getContainerVersion() ?? "N/A"}], ` +
          `deployedBeans=[${mdbContainer?.getDeployedBeanCount() ?? 0}], ` +
          `binder=[${binder?.getBinderName() ?? "N/A"} v${binder?.getBinderVersion() ?? "N/A"}]`,
        );
        jmsInfrastructureInitialized = true;
      }
    }
  }
  {
    const mediatorArch = ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.initializeArchitecture();
    console.debug(
      `[ModularArithmeticDivisibilityResolutionMediatorArchitecture] Mediation architecture initialized: ` +
      `provider=[${mediatorArch.provider.getProviderName()} v${mediatorArch.provider.getProviderVersion()}], ` +
      `registry=[${mediatorArch.registry.getRegistryName()} v${mediatorArch.registry.getRegistryVersion()}], ` +
      `visitor=[${mediatorArch.visitor.getVisitorName()} v${mediatorArch.visitor.getVisitorVersion()}], ` +
      `registeredMediators=[${mediatorArch.registry.getRegisteredDivisors().join(", ")}], ` +
      `factoryBeanCount=[${mediatorArch.registry.getFactoryBeanCount()}]`,
    );
  }
  {
    const specificationRegistry = DivisibilitySpecificationStrategyFactoryBeanFactory.createRegistry();
    const commandInvoker = ModuloArithmeticCommandInvokerFactoryBeanFactory.createInvoker();
    const moduloCommand = ModuloArithmeticCommandInvokerFactoryBeanFactory.getCommand();
    const templateMethodHandler = TemplateMethodResolutionChainHandlerFactoryBeanFactory.createBaseHandler();
    const decoratedTemplateMethodHandler = TemplateMethodResolutionChainHandlerFactoryBeanFactory.createDecoratedHandler();
    const auditTrailVisitor = EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.createVisitor();
    console.debug(
      `[SpecificationPatternInfrastructure] Enterprise specification pattern infrastructure initialized: ` +
      `registry=[${specificationRegistry.getRegistryName()} v${specificationRegistry.getRegistryVersion()}], ` +
      `specifications=[${specificationRegistry.getRegisteredSpecificationNames().join(", ")}], ` +
      `invoker=[${commandInvoker.getInvokerName()} v${commandInvoker.getInvokerVersion()}], ` +
      `moduloCommand=[${moduloCommand?.getCommandDescriptor() ?? "N/A"}], ` +
      `templateMethod=[${templateMethodHandler.getTemplateMethodDescriptor()}], ` +
      `decoratedTemplateMethod=[${decoratedTemplateMethodHandler.getTemplateMethodDescriptor()}], ` +
      `auditVisitor=[${auditTrailVisitor.getVisitorName()} v${auditTrailVisitor.getVisitorVersion()}]`,
    );
  }
  {
    let localizationInitialized = false;
    if (LocalizedMessageResolutionChainHandlerFactoryBeanFactory.getChainHead() === null) {
      const chainHandler = LocalizedMessageResolutionChainHandlerFactoryBeanFactory.createChainHandler("FULL");
      const localeStrategy = LocaleResolutionStrategyFactoryBeanFactory.createLocaleResolutionStrategy("DEFAULT");
      const resolver = LocalizedMessageResolverFactoryBeanFactory.createResolver(chainHandler, localeStrategy);
      console.debug(
        `[LocalizationInfrastructure] Enterprise localized message resolution infrastructure initialized: ` +
        `resolver=[${resolver.getResolverName()} v${resolver.getResolverVersion()}], ` +
        `chain=[${chainHandler.getChainHandlerName()} v${chainHandler.getChainHandlerVersion()}], ` +
        `locales=[${resolver.getSupportedLocales().join(", ")}], ` +
        `localeStrategy=[${localeStrategy.getStrategyName()}]`,
      );
      localizationInitialized = true;
    }
    if (localizationInitialized) {
      console.debug(
        `[LocalizationInfrastructure] Enterprise output message localization bootstrap complete – ` +
        `default locale=${new DefaultLocaleResolutionStrategyImpl().resolveLocale()}`,
      );
    }
  }
  {
    const expressionRegistry = EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.createRegistry();
    const expressionInterpreter = EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.createInterpreter();
    const expressionFactory = DivisibilityExpressionFactoryBeanFactory.createFactory();
    console.debug(
      `[ExpressionEngineInfrastructure] Enterprise divisibility expression interpreter pattern infrastructure initialized: ` +
      `registry=[${expressionRegistry.getRegistryName()} v${expressionRegistry.getRegistryVersion()}], ` +
      `interpreter=[${expressionInterpreter.getInterpreterName()} v${expressionInterpreter.getInterpreterVersion()}], ` +
      `factory=[${expressionFactory.getFactoryName()} v${expressionFactory.getFactoryVersion()}], ` +
      `evaluators=[${expressionRegistry.getRegisteredEvaluatorNames().join(", ")}], ` +
      `evaluatorCount=[${expressionRegistry.getEvaluatorCount()}]`,
    );
  }
  {
    const cacheDecorator = CacheAwareExpressionEvaluatorDecoratorFactoryBeanFactory.getCachedEvaluator();
    const cacheManager = EnterpriseComputationCacheManagerFactoryBeanFactory.getCacheManager();
    if (cacheDecorator !== null && cacheManager !== null) {
      console.debug(
        `[EnterpriseComputationCacheInfrastructure] Enterprise computation cache infrastructure initialized: ` +
        `decorator=[${cacheDecorator.getDecoratorName()} v${cacheDecorator.getDecoratorVersion()}], ` +
        `delegate=[${cacheDecorator.getDelegatingEvaluatorName()}], ` +
        `cacheHitCount=[${cacheDecorator.getCacheHitCount()}], ` +
        `evaluationCount=[${cacheDecorator.getEvaluationCount()}], ` +
        `manager=[${cacheManager.getCacheManagerDescriptor()}]`,
      );
    }
  }
  {
    const writer = FizzBuzzResultItemWriterFactoryBeanFactory.createWriter();
    const config = FizzBuzzBatchJobConfigurationFactoryBeanFactory.createConfiguration();
    const monitor = FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory.createMonitor();
    console.debug(
      `[BatchInfrastructure] Enterprise chunk-oriented batch processing infrastructure initialized: ` +
      `writer=[${writer.getWriterName()} v${writer.getWriterVersion()}], ` +
      `configuration=[${config.getConfigurationName()} v${config.getConfigurationVersion()}], ` +
      `monitor=[${monitor.getMonitorName()} v${monitor.getMonitorVersion()}], ` +
      `chunkSize=[${config.getChunkSize()}], ` +
      `jobInstance=[${config.getJobInstanceName()}]`,
    );
  }
  {
    if (!AopInfrastructureBeanFactory.isInfrastructureInitialized()) {
      const aopProvider = AopInfrastructureBeanFactory.initializeInfrastructure();
      const aopWeaver = AopInfrastructureBeanFactory.getWeaver();
      if (aopWeaver !== null) {
        AopInfrastructureBeanFactory.registerDefaultComputationAspects(aopWeaver);
      }
      console.debug(
        `[AopInfrastructure] Enterprise aspect-oriented programming infrastructure initialized: ` +
        `provider=[${aopProvider.getInfrastructureProviderName()} v${aopProvider.getInfrastructureProviderVersion()}], ` +
        `proxyFactory=[${AopInfrastructureBeanFactory.getProxyFactory()?.getProxyFactoryName() ?? "N/A"} v${AopInfrastructureBeanFactory.getProxyFactory()?.getProxyFactoryVersion() ?? "N/A"}], ` +
        `weaver=[${aopWeaver?.getWeaverName() ?? "N/A"} v${aopWeaver?.getWeaverVersion() ?? "N/A"}], ` +
        `registeredAspects=[${aopWeaver?.getRegisteredAspectCount() ?? 0}], ` +
        `pointcuts=[${aopWeaver?.getRegisteredPointcuts().map((p) => p.getPointcutName()).join(", ") ?? "N/A"}]`,
      );
    }
  }
  {
    if (!ComputationStateInfrastructureInitializerFactoryBeanFactory.isInfrastructureInitialized()) {
      const initialized = ComputationStateInfrastructureInitializerFactoryBeanFactory.initializeInfrastructure();
      const machine = ComputationStateMachineFactoryBeanFactory.getStateMachine();
      const mediator = ComputationStateMachineMediatorFactoryBeanFactory.getMediator();
      const visitor = ComputationStateTransitionVisitorFactoryBeanFactory.getVisitor();
      console.debug(
        `[ComputationStateInfrastructure] Enterprise computation state machine infrastructure initialized: ` +
        `initialized=[${initialized}], ` +
        `machine=[${machine?.getStateMachineName() ?? "N/A"} v${machine?.getStateMachineVersion() ?? "N/A"}], ` +
        `mediator=[${mediator?.getMediatorName() ?? "N/A"} v${mediator?.getMediatorVersion() ?? "N/A"}], ` +
        `visitor=[${visitor?.getVisitorName() ?? "N/A"} v${visitor?.getVisitorVersion() ?? "N/A"}], ` +
        `states=[${machine?.getStateTransitionHistory().join(", ") ?? "N/A"}]`,
      );
    }
  }
  {
    const preEvaluationRegistry = EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.createRegistry();
    const preEvaluationChain = EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.createFullChain(true);
    console.debug(
      `[PreEvaluationInfrastructure] Enterprise computed outcome pre-evaluation command chain infrastructure initialized: ` +
      `registry=[${preEvaluationRegistry.getRegistryName()} v${preEvaluationRegistry.getRegistryVersion()}], ` +
      `chain=[${preEvaluationChain.getChainName()} v${preEvaluationChain.getChainVersion()}], ` +
      `commands=[${preEvaluationChain.getRegisteredCommandNames().join(", ")}], ` +
      `registeredCommandCount=[${preEvaluationChain.getRegisteredCommandCount()}], ` +
      `registryCommandCount=[${preEvaluationRegistry.getRegisteredCommandCount()}]`,
    );
  }
  {
    const compositeProvider =
      EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.initializeProviderInfrastructure();
    console.debug(
      `[OutputCompositeInfrastructure] Enterprise output composite strategy provider infrastructure initialized: ` +
      `provider=[${compositeProvider.getProviderName()} v${compositeProvider.getProviderVersion()}], ` +
      `compositeEnabled=[${compositeProvider.isCompositeResolutionEnabled()}], ` +
      `registry=[${compositeProvider.getRegistry()?.getRegistryName() ?? "N/A"} v${compositeProvider.getRegistry()?.getRegistryVersion() ?? "N/A"}], ` +
      `components=[${compositeProvider.getRegistry()?.getRegisteredComponentNames().join(", ") ?? "N/A"}]`,
    );
  }
  {
    if (!EnterpriseComputedOutcomeEntityInfrastructureInitializerFactoryBeanFactory.isInfrastructureInitialized()) {
      const entityInfra = EnterpriseComputedOutcomeEntityInfrastructureInitializerFactoryBeanFactory.initializeInfrastructure();
      console.debug(
        `[ComputedOutcomeEntityInfrastructure] Enterprise computed outcome entity bean container infrastructure initialized: ` +
        `persistenceContext=[${entityInfra.persistenceContext.getContextName()} v${entityInfra.persistenceContext.getContextVersion()}], ` +
        `entityManager=[${entityInfra.entityManager.getEntityManagerName()} v${entityInfra.entityManager.getEntityManagerVersion()}], ` +
        `repository=[${entityInfra.repository.getRepositoryName()} v${entityInfra.repository.getRepositoryVersion()}], ` +
        `entityHome=[${entityInfra.entityHome.getHomeName()} v${entityInfra.entityHome.getHomeVersion()}], ` +
        `supportedEntity=[${entityInfra.entityHome.getSupportedEntityName()}]`,
      );
    }
  }
  {
    if (!AbstractDivisibilityStrategyProviderFactoryBeanFactory.isInfrastructureInitialized()) {
      const adsProvider =
        AbstractDivisibilityStrategyProviderFactoryBeanFactory.initializeProviderInfrastructure();
      const threeFactoryBean = ModuloEvaluationStrategyFactoryBeanFactory.createFactoryBeanForDivisor(3);
      const fiveFactoryBean = ModuloEvaluationStrategyFactoryBeanFactory.createFactoryBeanForDivisor(5);
      adsProvider.registerDivisibilityStrategyFactoryBean(3, threeFactoryBean);
      adsProvider.registerDivisibilityStrategyFactoryBean(5, fiveFactoryBean);
      const chain = DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.initializeChain([5, 3]);
      const threeEvaluator = DivisibilityStrategyEvaluatorFactoryBeanFactory.createEvaluator("ThreeEvaluator", "1.0.0-EVAL-3");
      const fiveEvaluator = DivisibilityStrategyEvaluatorFactoryBeanFactory.createEvaluator("FiveEvaluator", "1.0.0-EVAL-5");
      console.debug(
        `[AbstractDivisibilityStrategyInfrastructure] Enterprise abstract divisibility strategy provider infrastructure initialized: ` +
        `provider=[${adsProvider.getProviderName()} v${adsProvider.getProviderVersion()}], ` +
        `registeredDivisors=[${adsProvider.getRegisteredDivisors().join(", ")}], ` +
        `factoryBeanCount=[${adsProvider.getFactoryBeanCount()}], ` +
        `chainHandler=[${chain.getHandlerName()} v${chain.getHandlerVersion()}], ` +
        `chainHandlerNext=[${chain.getNextHandler()?.getHandlerName() ?? "null"}], ` +
        `evaluators=[${DivisibilityStrategyEvaluatorFactoryBeanFactory.getRegisteredEvaluatorCount()}], ` +
        `threeFactoryBean=[${threeFactoryBean.getFactoryBeanName()} v${threeFactoryBean.getFactoryBeanVersion()}], ` +
        `fiveFactoryBean=[${fiveFactoryBean.getFactoryBeanName()} v${fiveFactoryBean.getFactoryBeanVersion()}], ` +
        `threeChainHandler=[${threeFactoryBean.createChainHandler().getHandlerName()} v${threeFactoryBean.createChainHandler().getHandlerVersion()}], ` +
        `fiveChainHandler=[${fiveFactoryBean.createChainHandler().getHandlerName()} v${fiveFactoryBean.createChainHandler().getHandlerVersion()}]`,
      );
    }
  }
  {
    const delegationOrchestratorFactoryFactory =
      EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory.createFactoryFactory();
    if (!delegationOrchestratorFactoryFactory.createFactory().isOrchestratorInitialized()) {
      const visitor = ResolutionDelegationVisitorFactoryBeanFactory.createVisitor();
      const configurator = new DefaultResolutionDelegationConfiguratorBuilderImpl()
        .withOrchestratorName("FizzBuzzDelegationOrchestrator")
        .withOrchestratorVersion("1.0.0-STANDARD")
        .withVisitorConfigurationProfile("STANDARD")
        .withAuditingEnabled(true)
        .withVisitorChainActive(true)
        .withMaxDelegationDepth(10)
        .build();
      const orchestrator = EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory
        .getOrCreateOrchestrator([visitor]);
      console.debug(
        `[DelegationOrchestrationInfrastructure] Enterprise resolution delegation orchestration infrastructure initialized: ` +
        `factoryFactoryFactory=[${EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory.getFactoryFactoryName()} v${EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory.getFactoryFactoryVersion()}], ` +
        `orchestrator=[${orchestrator.getOrchestratorName()} v${orchestrator.getOrchestratorVersion()}], ` +
        `configurator=[${configurator.toDiagnosticString()}], ` +
        `visitors=[${orchestrator.getRegisteredVisitorNames().join(", ")}]`,
      );
    }
  }
  {
    const applicationContextForJmx = FizzBuzzEnterpriseApplicationContextFactoryBean.getApplicationContext();
    const managementMBean = applicationContextForJmx !== null
      ? (applicationContextForJmx as any).getManagementMBean?.() ?? null
      : null;
    if (managementMBean !== null && !JmxInfrastructureFactoryBeanFactory.isInfrastructureInitialized()) {
      const jmxInitialized = JmxInfrastructureFactoryBeanFactory.initializeJmxInfrastructure(managementMBean);
      if (jmxInitialized) {
        const jmxServer = JmxInfrastructureFactoryBeanFactory.getJmxServer();
        const monitoringMBean = JmxInfrastructureFactoryBeanFactory.getMonitoringMBean();
        console.debug(
          `[JMXInfrastructure] Enterprise JMX management and monitoring infrastructure initialized: ` +
          `server=[${jmxServer?.getServerName() ?? "N/A"} v${jmxServer?.getServerVersion() ?? "N/A"}], ` +
          `registeredMBeans=[${jmxServer?.getMBeanCount() ?? 0}], ` +
          `monitoringMBean=[${monitoringMBean?.getMBeanName() ?? "N/A"}], ` +
          `sloThreshold=[${monitoringMBean?.getSloThresholdMs() ?? "N/A"}ms], ` +
          `healthStatus=[${managementMBean.getHealthStatus()?.status ?? "UNKNOWN"}], ` +
          `totalResolved=[${managementMBean.getTotalValuesResolved()}]`,
        );
      }
    } else {
      console.debug(
        `[JMXInfrastructure] JMX infrastructure initialization skipped: ` +
        `applicationContext=[${applicationContextForJmx !== null ? "present" : "null"}], ` +
        `managementMBean=[${managementMBean !== null ? "present" : "null"}], ` +
        `infrastructureInitialized=[${JmxInfrastructureFactoryBeanFactory.isInfrastructureInitialized()}]`,
      );
    }
  }
  {
    if (!EnterpriseTransactionInfrastructureInitializerFactoryBeanFactory.isInfrastructureInitialized()) {
      const txInfrastructure =
        EnterpriseTransactionInfrastructureInitializerFactoryBeanFactory.initializeInfrastructure();
      console.debug(
        `[EnterpriseTransactionInfrastructure] Enterprise transaction processing infrastructure initialized: ` +
        `userTransaction=[${txInfrastructure.userTransaction.getUserTransactionName()} v${txInfrastructure.userTransaction.getUserTransactionVersion()}], ` +
        `syncRegistry=[${txInfrastructure.synchronizationRegistry.getRegistryName()} v${txInfrastructure.synchronizationRegistry.getRegistryVersion()}], ` +
        `rollbackStrategy=[${txInfrastructure.rollbackStrategy.getRollbackStrategyName()} v${txInfrastructure.rollbackStrategy.getRollbackStrategyVersion()}], ` +
        `timeoutConfig=[${txInfrastructure.timeoutConfigurationProvider.getConfigurationProviderName()} v${txInfrastructure.timeoutConfigurationProvider.getConfigurationProviderVersion()}]`,
      );
    }
  }
  {
    if (!JndiInitialContextFactoryBeanFactory.isInfrastructureInitialized()) {
      const jndiContext = JndiInitialContextFactoryBeanFactory.initializeJndiInfrastructure(
        "localhost:1099",
        "com.enterprise.fizzbuzz.jndi.StandardJndiContextFactoryImpl",
      );
      console.debug(
        `[JndiInfrastructure] Enterprise JNDI naming infrastructure initialized: ` +
        `context=[${jndiContext.getInitialContextName()} v${jndiContext.getInitialContextVersion()}], ` +
        `factory=[${JndiInitialContextFactoryBeanFactory.getContextFactory()?.getContextFactoryName() ?? "N/A"}], ` +
        `bindings=[${jndiContext.getRegisteredBindingNames().length}], ` +
        `contextOpen=[${jndiContext.isContextOpen()}]`,
      );
    }
  }
  {
    if (!RmiRegistryFactoryBeanFactory.isInfrastructureInitialized()) {
      const rmiRegistry = RmiRegistryFactoryBeanFactory.initializeRmiInfrastructure();
      console.debug(
        `[RmiInfrastructure] Enterprise RMI registry infrastructure initialized: ` +
        `registry=[${rmiRegistry.getRegistryName()} v${rmiRegistry.getRegistryVersion()}], ` +
        `registeredObjects=[${rmiRegistry.list().length}]`,
      );
    }
  }
  {
    if (!CorbaNamingServiceFactoryBeanFactory.isInfrastructureInitialized()) {
      const corbaNaming = CorbaNamingServiceFactoryBeanFactory.initializeCorbaInfrastructure();
      console.debug(
        `[CorbaInfrastructure] Enterprise CORBA CosNaming infrastructure initialized: ` +
        `namingService=[${corbaNaming.getNamingServiceName()} v${corbaNaming.getNamingServiceVersion()}], ` +
        `rootContext=[${(corbaNaming as any).getRootContextName?.() ?? "NameService"}], ` +
        `boundNames=[${corbaNaming.list().join(", ")}]`,
      );
    }
  }
  {
    if (!ComputationResultPostProcessorArchitectureFactoryBeanFactory.isArchitectureInitialized()) {
      const postProcessorProvider =
        ComputationResultPostProcessorArchitectureFactoryBeanFactory.initializeArchitecture();
      const registry = ComputationResultPostProcessorArchitectureFactoryBeanFactory.getRegistry()!;
      const chainHandler = ComputationResultPostProcessorArchitectureFactoryBeanFactory.getChainHandler()!;
      console.debug(
        `[PostProcessorArchitectureInfrastructure] Enterprise computation result post-processor architecture initialized: ` +
        `provider=[${postProcessorProvider.getProviderName()} v${postProcessorProvider.getProviderVersion()}], ` +
        `registry=[${registry.getRegistryName()} v${registry.getRegistryVersion()}], ` +
        `chainHandler=[${chainHandler.getChainName()} v${chainHandler.getChainVersion()}], ` +
        `registeredProcessors=[${registry.getRegisteredProcessors().map((p) => `${p.getProcessorName()}@${p.getProcessorPriority()}`).join(", ")}], ` +
        `processorCount=[${registry.getProcessorCount()}], ` +
        `chainDescriptor=[${postProcessorProvider.getActiveProcessorChainDescriptor()}]`,
      );
    }
  }
  {
    if (!EnterpriseStrategyLookupServiceFactoryBeanFactory.isInfrastructureInitialized()) {
      const strategyLookupService =
        EnterpriseStrategyLookupServiceFactoryBeanFactory.initializeLookupService();
      const adapterFactory =
        EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.initializeAdapterFactory();
      const divisibilityProvider = AbstractDivisibilityStrategyProviderFactoryBeanFactory.getProvider();
      if (divisibilityProvider !== null) {
        const registeredDivisors = divisibilityProvider.getRegisteredDivisors();
        for (const divisor of registeredDivisors) {
          const factoryBean = divisibilityProvider.resolveDivisibilityStrategyFactoryBean(divisor);
          strategyLookupService.registerStrategyProvider(
            `divisibility:${divisor}`,
            factoryBean,
            factoryBean.getFactoryBeanVersion(),
          );
        }
      }
      console.debug(
        `[StrategyLookupServiceInfrastructure] Enterprise strategy lookup service infrastructure initialized: ` +
        `service=[${strategyLookupService.getLookupServiceName()} v${strategyLookupService.getLookupServiceVersion()}], ` +
        `adapterFactory=[${adapterFactory.getAdapterFactoryName()} v${adapterFactory.getAdapterFactoryVersion()}], ` +
        `registeredStrategies=[${strategyLookupService.getRegisteredStrategyNames().join(", ")}], ` +
        `strategyCount=[${strategyLookupService.getStrategyProviderCount()}], ` +
        `adapterTypes=[${adapterFactory.getSupportedAdapterTypes().join(", ")}]`,
      );
    }
  }
  {
    if (!EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.isRegistryInitialized()) {
      let descriptor = EnterpriseConfigurationDescriptorParserFactoryBeanFactory.parseConfiguration();
      const registry = EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.createRegistry(
        descriptor.isConfigurationValid() ? "DESCRIPTOR_DRIVEN" : "STANDARD",
      );
      if (descriptor.isConfigurationValid()) {
        registry.reloadConfigurationFromDescriptor(descriptor);
      }
      const mediationService = EnterpriseOrchestrationMediationServiceFactoryBeanFactory.createMediationService(true);
      console.debug(
        `[EnterpriseConfigurationInfrastructure] Enterprise configuration descriptor-driven infrastructure initialized: ` +
        `parser=[${EnterpriseConfigurationDescriptorParserFactoryBeanFactory.getFactoryBeanName()} v${EnterpriseConfigurationDescriptorParserFactoryBeanFactory.getFactoryBeanVersion()}], ` +
        `descriptor=[${descriptor.getDescriptorName()} v${descriptor.getDescriptorVersion()}] from source=[${descriptor.getDescriptorSource()}], ` +
        `valid=[${descriptor.isConfigurationValid()}], ` +
        `properties=[${descriptor.getProperties().length}], ` +
        `schemaVersion=[${descriptor.getSchemaVersion()}], ` +
        `registry=[${registry.getRegistryName()} v${registry.getRegistryVersion()}], ` +
        `decorators=[${registry.getRegisteredDecoratorCount()}], ` +
        `profile=[${registry.getConfigurationProfileName()}], ` +
        `mediation=[${mediationService.getServiceName()} v${mediationService.getServiceVersion()}], ` +
        `mediationChain=[${mediationService.getActiveHandlerChainDescriptor()}], ` +
        `mediationHandlers=[${mediationService.getRegisteredHandlerCount()}]`,
      );
    }
  }
  {
    if (!EnterpriseComputationResolutionMediatorArchitectureFactoryBeanFactory.isArchitectureInitialized()) {
      const mediatorArch = EnterpriseComputationResolutionMediatorArchitectureFactoryBeanFactory.initializeArchitecture();
      const registry = ComputationResolutionAdapterRegistryFactoryBeanFactory.createRegistry();
      const threeAdapter = DivisorSpecificComputationAdapterFactoryBeanFactory.createAdapter(3, "Fizz");
      const fiveAdapter = DivisorSpecificComputationAdapterFactoryBeanFactory.createAdapter(5, "Buzz");
      const fifteenAdapter = DivisorSpecificComputationAdapterFactoryBeanFactory.createAdapter(15, "FizzBuzz");
      registry.registerAdapter(fifteenAdapter);
      registry.registerAdapter(threeAdapter);
      registry.registerAdapter(fiveAdapter);
      console.debug(
        `[ComputationResolutionMediatorArchitectureInfrastructure] Enterprise computation adapter mediator architecture initialized: ` +
        `arch=[${mediatorArch.getArchitectureName()} v${mediatorArch.getArchitectureVersion()}], ` +
        `registry=[${registry.getRegistryName()} v${registry.getRegistryVersion()}], ` +
        `registeredAdapters=[${registry.getRegisteredAdapterNames().join(", ")}], ` +
        `adapterCount=[${registry.getAdapterCount()}], ` +
        `visitor=[${mediatorArch.getVisitor().getVisitorName()} v${mediatorArch.getVisitor().getVisitorVersion()}], ` +
        `chain=[${mediatorArch.getChainHandler().getHandlerName()} v${mediatorArch.getChainHandler().getHandlerVersion()}], ` +
        `threeAdapter=[${threeAdapter.getAdapterName()} v${threeAdapter.getAdapterVersion()}], ` +
        `fiveAdapter=[${fiveAdapter.getAdapterName()} v${fiveAdapter.getAdapterVersion()}], ` +
        `fifteenAdapter=[${fifteenAdapter.getAdapterName()} v${fifteenAdapter.getAdapterVersion()}], ` +
        `threeCanHandle15=[${threeAdapter.canHandle(15)}], ` +
        `fiveCanHandle15=[${fiveAdapter.canHandle(15)}], ` +
        `fifteenCanHandle15=[${fifteenAdapter.canHandle(15)}]`,
      );
    }
  }
  return true;
})();

let enterpriseBusinessDelegate: IFizzBuzzEnterpriseBusinessDelegate | null = null;
let enterpriseBusinessDelegateServiceLocatorAwareContext: IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext | null = null;
let businessDelegateServiceLocatorProxy: IServiceLocatorManagedBusinessDelegateProxy | null = null;
let enterpriseResolutionStrategyChainOfResponsibilityManager: IFizzBuzzResolutionStrategyChainOfResponsibilityManager | null = null;
let enterpriseResolutionStrategySelectorVisitor: IEnterpriseFizzBuzzResolutionStrategySelectorVisitor | null = null;
let enterpriseBusinessDelegateInfrastructureInitialized = false;

function initializeEnterpriseBusinessDelegateInfrastructure(): void {
  if (enterpriseBusinessDelegateInfrastructureInitialized) return;

  const serviceLocator: IServiceLocator = ServiceLocatorFactoryBeanFactory.createFactoryBean().createServiceLocator();
  const publicApiDelegate = resolvePublicApiDelegate();

  enterpriseResolutionStrategySelectorVisitor =
    FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.getStrategySelectorVisitor();

  const passThroughChainDelegate = (_value: number, innerResolver: (value: number) => string): string => {
    return innerResolver(_value);
  };

  const moduloThreeChainDelegate = passThroughChainDelegate;
  const moduloFiveChainDelegate = passThroughChainDelegate;
  const moduloFifteenChainDelegate = passThroughChainDelegate;

  const templateMethodHandler = TemplateMethodResolutionChainHandlerFactoryBeanFactory.getDecoratedHandler();
  const auditTrailVisitor = EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.getVisitor();

  enterpriseResolutionStrategyChainOfResponsibilityManager =
    FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.createChainManager(
      moduloThreeChainDelegate,
      moduloFiveChainDelegate,
      moduloFifteenChainDelegate,
      enterpriseResolutionStrategySelectorVisitor ?? undefined,
      templateMethodHandler ?? undefined,
      auditTrailVisitor ?? undefined,
    );

  const baseFacade = resolveResolutionFacade();
  const validationAwareDecorator =
    ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
      baseFacade,
      "ENABLED_STRICT",
    );
  const interceptionFilterChainDecorator =
    InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
      validationAwareDecorator,
      InterceptionFilterChainDecoratorConfigurationProfile.ENABLED_STANDARD,
    );
  const configurationProvider = EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.createConfigurationProvider();
  const configurationAwareDecorator = new DefaultConfigurationAwareResolutionFacadeDecoratorImpl(
    interceptionFilterChainDecorator,
    configurationProvider,
  );

  enterpriseBusinessDelegateServiceLocatorAwareContext =
    new DefaultFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContextImpl(
      serviceLocator,
      publicApiDelegate,
      resolveMediationOrchestrator(),
      resolveGovernanceEnforcementFacade(),
      baseFacade,
      validationAwareDecorator,
      interceptionFilterChainDecorator,
      configurationAwareDecorator,
      configurationProvider,
      serviceLocator.getValueResolver(),
      enterpriseResolutionStrategyChainOfResponsibilityManager,
    );

  FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.setServiceLocatorAwareContext(
    enterpriseBusinessDelegateServiceLocatorAwareContext,
  );
  enterpriseBusinessDelegate =
    FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.createBusinessDelegate();

  businessDelegateServiceLocatorProxy =
    ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory.createProxy(
      publicApiDelegate,
      serviceLocator,
    );

  console.debug(
    `[EnterpriseBusinessDelegateInfrastructure] Business delegate infrastructure initialized: ` +
    `delegate=[${enterpriseBusinessDelegate.getDelegateName()} v${enterpriseBusinessDelegate.getDelegateVersion()}], ` +
    `chainOfResponsibility=[${enterpriseResolutionStrategyChainOfResponsibilityManager.getChainName()} v${enterpriseResolutionStrategyChainOfResponsibilityManager.getChainVersion()}], ` +
    `handlers=[${enterpriseResolutionStrategyChainOfResponsibilityManager.getRegisteredHandlerNames().join(", ")}], ` +
    `proxy=[${businessDelegateServiceLocatorProxy.getProxyName()} v${businessDelegateServiceLocatorProxy.getProxyVersion()}], ` +
    `visitor=[${enterpriseResolutionStrategySelectorVisitor?.getVisitorName() ?? "N/A"} v${enterpriseResolutionStrategySelectorVisitor?.getVisitorVersion() ?? "N/A"}]`,
  );

  enterpriseBusinessDelegateInfrastructureInitialized = true;
}

let governanceEnforcementFacade: IEnterpriseComputationGovernancePolicyEnforcementFacade | null = null;
let mediationOrchestrator: IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator | null = null;
let builderPipelineProduct: IFizzBuzzComputationPipelineProduct | null = null;
let iteratorBasedComputationInitialized = false;

function initializeIteratorBasedComputationPipeline(): void {
  if (iteratorBasedComputationInitialized) return;

  const governanceEnforcer = (value: number, inner: (v: number) => string): string => {
    const facade = resolveGovernanceEnforcementFacade();
    return facade.enforceComputation(value, inner);
  };

  const orchestrator = resolveMediationOrchestrator();
  const facade = resolveResolutionFacade();

  const configurationProvider =
    FizzBuzzPipelineProductConfigurationProviderFactoryBeanFactory.createConfigurationProvider(true);
  const configProfile = configurationProvider.resolveConfigurationProfile("ENTERPRISE_ITERATOR_BASED");
  const decoratorChainProfile = configProfile.getDecoratorChainProfile();

  const builder = StandardFizzBuzzComputationPipelineBuilderFactoryBeanFactory.createBuilder(false);
  builder
    .withGovernanceEnforcement(governanceEnforcer)
    .withMediationOrchestrator(orchestrator)
    .withResolutionFacade(facade)
    .withConfigurationProfile(configProfile.getProfileName())
    .withSlaThreshold(configProfile.getSlaThresholdMs())
    .withCacheEnabled(configProfile.isCacheEnabled());

  const rawProduct = StandardFizzBuzzComputationPipelineBuilderFactoryBeanFactory.buildProduct(builder);

  builderPipelineProduct = FizzBuzzPipelineProductConfigurationProviderFactoryBeanFactory.applyDecoratorChain(
    rawProduct,
    decoratorChainProfile,
  );

  const iterator = StandardFizzBuzzRangeIteratorFactoryBeanFactory.createIterator(
    1, 100,
    (v: number) => builderPipelineProduct!.resolveSingleValue(v),
    false,
  );

  console.debug(
    `[IteratorBasedComputationPipeline] Pipeline product initialized: ` +
    `product=[${builderPipelineProduct.getProductName()} v${builderPipelineProduct.getProductVersion()}], ` +
    `profile=[${builderPipelineProduct.getPipelineConfigurationProfile()}], ` +
    `decoratorChain=[${decoratorChainProfile}], ` +
    `iterator=[${iterator.getIteratorName()} v${iterator.getIteratorVersion()}], ` +
    `diagnostics=[${JSON.stringify(builderPipelineProduct.getDiagnosticSummary())}]`,
  );

  iteratorBasedComputationInitialized = true;
}

function resolveGovernanceEnforcementFacade(): IEnterpriseComputationGovernancePolicyEnforcementFacade {
  if (governanceEnforcementFacade === null) {
    governanceEnforcementFacade =
      EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory.createGovernanceEnforcementFacade(
        EnterpriseComputationGovernanceFacadeConfigurationProfile.STANDARD,
      );
  }
  return governanceEnforcementFacade!;
}

function resolveMediationOrchestrator(): IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator {
  if (mediationOrchestrator === null) {
    mediationOrchestrator =
      EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.createOrchestrator(
        DirectiveResolutionMediationOrchestratorConfigurationProfile.STANDARD,
      );
  }
  return mediationOrchestrator!;
}

function wrapWithPreEvaluation(
  facade: IFizzBuzzSingleValueResolutionFacade,
): IPreEvaluationAwareResolutionFacadeDecorator {
  const registry = EnterpriseComputedOutcomePreEvaluationCommandRegistryFactoryBeanFactory.getRegistry();
  const chain = EnterpriseComputedOutcomePreEvaluationCommandChainFactoryBeanFactory.getChain();
  if (registry !== null && chain !== null) {
    const preEvaluationDecorator = EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
      facade,
      chain,
      registry,
    );

    if (EnterpriseComputedOutcomeEntityInfrastructureInitializerFactoryBeanFactory.isInfrastructureInitialized()) {
      const entityManager =
        EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory.getEntityManager()!;
      const repository =
        EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory.getRepository()!;
      const entityHome =
        EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory.getEntityHome()!;
      return EnterpriseComputedOutcomeEntityAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
        preEvaluationDecorator,
        chain,
        registry,
        entityManager,
        repository,
        entityHome,
      );
    }

    return preEvaluationDecorator;
  }
  throw new Error(
    `[PreEvaluationInfrastructure] Pre-evaluation command chain infrastructure not initialized. ` +
    `Cannot create pre-evaluation-aware decorator. ` +
    `registry=[${registry !== null ? "initialized" : "null"}], ` +
    `chain=[${chain !== null ? "initialized" : "null"}]`,
  );
}

function resolveResolutionFacade(): IFizzBuzzSingleValueResolutionFacade {
  let baseFacade: IFizzBuzzSingleValueResolutionFacade;
  if (BOOTSTRAP_GATE_INITIALIZED) {
    const context = FizzBuzzEnterpriseApplicationContextFactoryBean.getApplicationContext();
    if (context !== null && context.isInitialized()) {
      baseFacade = FizzBuzzResolutionFacadeFactoryBeanFactory.createResolutionFacade(
        FizzBuzzResolutionFacadeConfigurationProfile.STANDARD,
      );
    } else {
      baseFacade = FizzBuzzResolutionFacadeFactoryBeanFactory.createResolutionFacade(
        FizzBuzzResolutionFacadeConfigurationProfile.STANDARD,
      );
    }
  } else {
    baseFacade = FizzBuzzResolutionFacadeFactoryBeanFactory.createResolutionFacade(
      FizzBuzzResolutionFacadeConfigurationProfile.STANDARD,
    );
  }
  const validationAwareDecorator: IValidationAwareResolutionFacadeDecorator =
    ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
      baseFacade,
      "ENABLED_STRICT",
    );
  const interceptionFilterChainDecorator =
    InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
      validationAwareDecorator,
      InterceptionFilterChainDecoratorConfigurationProfile.ENABLED_STANDARD,
    );
  const configurationProvider = EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.createConfigurationProvider();
  const configurationAwareDecorator = new DefaultConfigurationAwareResolutionFacadeDecoratorImpl(
    interceptionFilterChainDecorator,
    configurationProvider,
  );
  const documentBuilder = EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.createBuilder();
  const documentVisitor = EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.createVisitor();
  const documentRenderer = EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.createRenderer();
  const baseDocumentAwareDecorator =
    EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
      configurationAwareDecorator,
      documentBuilder,
      documentVisitor,
      documentRenderer,
    );
  if (AopInfrastructureBeanFactory.isInfrastructureInitialized()) {
    const aopDecorator = AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
      baseDocumentAwareDecorator,
      "STANDARD_AOP_ENABLED",
    );
    console.debug(
      `[AspectOrientedResolutionFacadeDecorator] AOP-aware decorator created: ` +
      `decorator=[${aopDecorator.getDecoratorName()} v${aopDecorator.getDecoratorVersion()}], ` +
      `proxyFactory=[${aopDecorator.getAopProxyFactory().getProxyFactoryName()} v${aopDecorator.getAopProxyFactory().getProxyFactoryVersion()}], ` +
      `weaver=[${aopDecorator.getAopWeaver().getWeaverName()} v${aopDecorator.getAopWeaver().getWeaverVersion()}], ` +
      `      wovenAspects=[${aopDecorator.getAopWeaver().getRegisteredAspectCount()}]`,
    );
    const preEvaluationAware = wrapWithPreEvaluation(aopDecorator);
    const stateMachineAware = wrapWithComputationStateMachine(preEvaluationAware);
    const txAwareDecorator = wrapWithTransactionPropagation(stateMachineAware);
    const adsDecorator = wrapWithAbstractDivisibilityStrategyResolution(txAwareDecorator);
    const jndiDecorated = wrapWithEnterpriseJndiEjbResolution(adsDecorator);
    const postProcessed = wrapWithPostProcessorResolution(jndiDecorated);
    const strategyLookupWrapped = wrapWithStrategyLookupServiceResolution(postProcessed);
    const orchestrationWrapped = wrapWithOrchestrationMediationResolution(strategyLookupWrapped);
    return wrapWithComputationResolutionMediatorArchitecture(orchestrationWrapped);
  }
  const executionCoordinatorAwareFacade = ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.createCoordinatorAwareFacadeDecorator(
    baseDocumentAwareDecorator,
    true,
    200,
  );
  console.debug(
    `[ExecutionCoordinatorAwareDecorator] Execution coordinator-aware facade decorator applied: ` +
    `facade=[${executionCoordinatorAwareFacade.getFacadeName()} v${executionCoordinatorAwareFacade.getFacadeVersion()}], ` +
    `coordinatorEngaged=[${executionCoordinatorAwareFacade.isCoordinatorEngaged()}], ` +
    `strategies=[${executionCoordinatorAwareFacade.getExecutionCoordinator().getRegisteredExecutionStrategies().join(", ")}]`,
  );
  const preEvaluationAware = wrapWithPreEvaluation(executionCoordinatorAwareFacade);
  const stateMachineAware = wrapWithComputationStateMachine(preEvaluationAware);
  const transactionAware = wrapWithTransactionPropagation(stateMachineAware);
  const adsDecorator = wrapWithAbstractDivisibilityStrategyResolution(transactionAware);
  const jndiDecorated = wrapWithEnterpriseJndiEjbResolution(adsDecorator);
  const postProcessed = wrapWithPostProcessorResolution(jndiDecorated);
  const strategyLookupWrapped = wrapWithStrategyLookupServiceResolution(postProcessed);
  const orchestrationWrapped = wrapWithOrchestrationMediationResolution(strategyLookupWrapped);
  return wrapWithComputationResolutionMediatorArchitecture(orchestrationWrapped);
}

function wrapWithComputationResolutionMediatorArchitecture(
  facade: IFizzBuzzSingleValueResolutionFacade,
): IFizzBuzzSingleValueResolutionFacade {
  if (EnterpriseComputationResolutionMediatorArchitectureFactoryBeanFactory.isArchitectureInitialized()) {
    const architecture = EnterpriseComputationResolutionMediatorArchitectureFactoryBeanFactory.getArchitecture()!;
    const mediatorDecorator =
      ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
        facade,
        architecture,
        true,
      );
    const registeredAdapters = architecture.getRegisteredAdapters().map(
      (a) => `${a.getAdapterName()}@D${a.getAdapterDivisor()}:${a.getAdapterOutputLabel()}`,
    );
    console.debug(
      `[ComputationResolutionMediatorArchitectureAwareDecorator] Adapter mediator architecture-aware facade decorator applied: ` +
      `decorator=[${mediatorDecorator.getDecoratorName()} v${mediatorDecorator.getDecoratorVersion()}], ` +
      `wrappedFacade=[${mediatorDecorator.getWrappedFacade().getFacadeName()}], ` +
      `arch=[${architecture.getArchitectureName()} v${architecture.getArchitectureVersion()}], ` +
      `archReady=[${architecture.isArchitectureReady()}], ` +
      `registeredAdapters=[${registeredAdapters.join(", ")}], ` +
      `adapterCount=[${architecture.getRegisteredAdapters().length}], ` +
      `decoratorEnabled=[${mediatorDecorator.isDecoratorEnabled()}]`,
    );
    return mediatorDecorator;
  }
  return facade;
}

function wrapWithAbstractDivisibilityStrategyResolution(
  facade: IFizzBuzzSingleValueResolutionFacade,
): IFizzBuzzSingleValueResolutionFacade {
  if (AbstractDivisibilityStrategyProviderFactoryBeanFactory.isInfrastructureInitialized()) {
    const adsDecorator =
      AbstractDivisibilityStrategyAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
        facade,
      );
    console.debug(
      `[AbstractDivisibilityStrategyAwareDecorator] Abstract divisibility strategy-aware facade decorator applied: ` +
      `decorator=[${adsDecorator.getFacadeName()} v${adsDecorator.getFacadeVersion()}], ` +
      `provider=[${adsDecorator.getAbstractDivisibilityStrategyProvider().getProviderName()} v${adsDecorator.getAbstractDivisibilityStrategyProvider().getProviderVersion()}], ` +
      `registeredDivisors=[${adsDecorator.getAbstractDivisibilityStrategyProvider().getRegisteredDivisors().join(", ")}], ` +
      `evaluationCount=[${adsDecorator.getDivisibilityEvaluationCount()}]`,
    );
    return adsDecorator;
  }
  return facade;
}

function wrapWithEnterpriseJndiEjbResolution(
  facade: IFizzBuzzSingleValueResolutionFacade,
): IFizzBuzzSingleValueResolutionFacade {
  if (
    JndiInitialContextFactoryBeanFactory.isInfrastructureInitialized() &&
    RmiRegistryFactoryBeanFactory.isInfrastructureInitialized() &&
    !EjbHomeFactoryBeanFactory.isInfrastructureInitialized()
  ) {
    const jndiContext: IJndiInitialContext | null = JndiInitialContextFactoryBeanFactory.getInitialContext();
    const rmiRegistry = RmiRegistryFactoryBeanFactory.getRegistry();
    const rmiRemote = FizzBuzzComputationRmiStubFactoryBeanFactory.createRemoteObject(facade);
    if (rmiRegistry !== null) {
      RmiRegistryFactoryBeanFactory.bindRemoteObject(
        "FizzBuzzComputationRmiRemote",
        rmiRemote,
      );
    }
    const rmiStub = RmiRegistryFactoryBeanFactory.createStub("FizzBuzzComputationRmiRemote");
    EjbHomeFactoryBeanFactory.initializeEjbInfrastructure(rmiStub, 3);
    const ejbHome = EjbHomeFactoryBeanFactory.getHome();
    if (ejbHome !== null) {
      const ejbBinding = EjbJndiBindingFactoryBeanFactory.createBinding(
        "ejb/fizzbuzz/ComputationEJB",
        "com.enterprise.fizzbuzz.ejb.contracts.IEjbHome",
        "com.enterprise.fizzbuzz.ejb.contracts.IEjbObject",
        "com.enterprise.fizzbuzz.ejb.impl.FizzBuzzComputationEjbSessionBeanImpl",
      );
      if (jndiContext !== null) {
        EjbJndiBindingFactoryBeanFactory.registerBindingWithJndi(ejbHome, ejbBinding, jndiContext);
        const corbaRef: ICorbaObjectReference | null = CorbaNamingServiceFactoryBeanFactory.createObjectReference(
          "IDL:com/enterprise/fizzbuzz/corba/FizzBuzzComputationEJB:1.0",
          "FizzBuzzComputationEJB",
          ejbHome,
        );
        const corbaNaming = CorbaNamingServiceFactoryBeanFactory.getNamingService();
        if (corbaNaming !== null) {
          corbaNaming.bind("ejb/fizzbuzz/ComputationEJB/corba", corbaRef);
        }
      }
      EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.initializeJndiEjbBridgeInfrastructure(ejbHome);
    }
    const ejbDecorator: IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator =
      EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.createJndiEjbAwareDecorator(
        facade,
        true,
      );
    console.debug(
      `[EnterpriseJndiEjbResolution] Enterprise JNDI/EJB resolution decorator applied: ` +
      `decorator=[${ejbDecorator.getDecoratorName()} v${ejbDecorator.getDecoratorVersion()}], ` +
      `jndiPath=[${ejbDecorator.getJndiLookupPath()}], ` +
      `ejbRoutingEnabled=[${ejbDecorator.isEjbRoutingEnabled()}], ` +
      `ejbHome=[${EjbHomeFactoryBeanFactory.getHome()?.getHomeName() ?? "N/A"} ` +
      `v${EjbHomeFactoryBeanFactory.getHome()?.getHomeVersion() ?? "N/A"}], ` +
      `rmiStub=[${rmiStub.getStubName()} v${rmiStub.getStubVersion()}], ` +
      `jndiBindings=[${jndiContext?.getRegisteredBindingNames().join(", ") ?? "N/A"}], ` +
      `corbaBindings=[${CorbaNamingServiceFactoryBeanFactory.getNamingService()?.list().join(", ") ?? "N/A"}]`,
    );
    return ejbDecorator;
  }
  return facade;
}

function wrapWithPostProcessorResolution(
  facade: IFizzBuzzSingleValueResolutionFacade,
): IFizzBuzzSingleValueResolutionFacade {
  if (ComputationResultPostProcessorArchitectureFactoryBeanFactory.isArchitectureInitialized()) {
    const postProcessorDecorator =
      PostProcessorAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
        facade,
        true,
      );
    console.debug(
      `[PostProcessorResolutionDecorator] Post-processor resolution decorator applied: ` +
      `decorator=[${postProcessorDecorator.getDecoratorName()} v${postProcessorDecorator.getDecoratorVersion()}], ` +
      `wrappedFacade=[${postProcessorDecorator.getWrappedFacadeName()}], ` +
      `provider=[${postProcessorDecorator.getPostProcessorProviderName()}], ` +
      `enabled=[${postProcessorDecorator.isDecoratorEnabled()}]`,
    );
    return postProcessorDecorator;
  }
  return facade;
}

let strategyLookupService: IEnterpriseStrategyLookupService | null = null;

function wrapWithStrategyLookupServiceResolution(
  facade: IFizzBuzzSingleValueResolutionFacade,
): IFizzBuzzSingleValueResolutionFacade {
  if (EnterpriseStrategyLookupServiceFactoryBeanFactory.isInfrastructureInitialized()) {
    if (strategyLookupService === null) {
      strategyLookupService = EnterpriseStrategyLookupServiceFactoryBeanFactory.getLookupService();
    }
    const lookupServiceDecorator =
      EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
        facade,
        strategyLookupService!,
      );
    console.debug(
      `[StrategyLookupServiceResolutionDecorator] Strategy lookup service resolution decorator applied: ` +
      `decorator=[${lookupServiceDecorator.getDecoratorName()} v${lookupServiceDecorator.getDecoratorVersion()}], ` +
      `wrappedFacade=[${lookupServiceDecorator.getWrappedFacadeName()}], ` +
      `lookupService=[${strategyLookupService!.getLookupServiceName()} v${strategyLookupService!.getLookupServiceVersion()}], ` +
      `registeredStrategies=[${strategyLookupService!.getRegisteredStrategyNames().join(", ")}], ` +
      `registrationCount=[${lookupServiceDecorator.getLookupServiceRegistrationCount()}], ` +
      `decoratorEnabled=[${lookupServiceDecorator.isDecoratorEnabled()}]`,
    );
    return lookupServiceDecorator;
  }
  return facade;
}

function wrapWithOrchestrationMediationResolution(
  facade: IFizzBuzzSingleValueResolutionFacade,
): IFizzBuzzSingleValueResolutionFacade {
  if (EnterpriseOrchestrationMediationServiceFactoryBeanFactory.isServiceInitialized()) {
    const mediationDecorator =
      EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
        facade,
        true,
      );
    console.debug(
      `[OrchestrationMediationResolutionDecorator] Enterprise orchestration mediation resolution decorator applied: ` +
      `decorator=[${mediationDecorator.getDecoratorName()} v${mediationDecorator.getDecoratorVersion()}], ` +
      `wrappedFacade=[${mediationDecorator.getWrappedFacade().getFacadeName()}], ` +
      `mediationService=[${mediationDecorator.getMediationService().getServiceName()} v${mediationDecorator.getMediationService().getServiceVersion()}], ` +
      `activeHandlerChain=[${mediationDecorator.getMediationService().getActiveHandlerChainDescriptor()}], ` +
      `decoratorEnabled=[${mediationDecorator.isDecoratorEnabled()}]`,
    );
    return mediationDecorator;
  }
  return facade;
}

function wrapWithTransactionPropagation(
  facade: IFizzBuzzSingleValueResolutionFacade,
): IFizzBuzzSingleValueResolutionFacade {
  if (EnterpriseTransactionInfrastructureInitializerFactoryBeanFactory.isInfrastructureInitialized()) {
    const transactionDecorator: IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator =
      EnterpriseTransactionContextPropagatingDecoratorFactoryBeanFactory.createDecorator(
        facade,
        TransactionPropagationDecoratorConfigurationProfile.TRANSACTIONAL_REQUIRED,
      );
    console.debug(
      `[TransactionPropagationDecorator] Transaction context propagation decorator applied: ` +
      `decorator=[${transactionDecorator.getDecoratorName()} v${transactionDecorator.getDecoratorVersion()}], ` +
      `wrappedFacade=[${transactionDecorator.getWrappedFacade().getFacadeName()}], ` +
      `attributeType=[${transactionDecorator.getTransactionAttributeType()}]`,
    );
    return transactionDecorator;
  }
  return facade;
}

function wrapWithComputationStateMachine(
  facade: IFizzBuzzSingleValueResolutionFacade,
): IFizzBuzzSingleValueResolutionFacade {
  const stateMachineDecorator: IComputationStateMachineAwareResolutionFacadeDecorator =
    ComputationStateMachineAwareResolutionFacadeDecoratorFactoryBeanFactory.createDecorator(
      facade,
      50,
    );
  console.debug(
    `[ComputationStateMachineDecorator] State machine-aware facade decorator applied: ` +
    `decorator=[${stateMachineDecorator.getDecoratorName()} v${stateMachineDecorator.getDecoratorVersion()}], ` +
    `stateMachine=[${stateMachineDecorator.getStateMachine().getStateMachineName()} v${stateMachineDecorator.getStateMachine().getStateMachineVersion()}], ` +
    `mediator=[${stateMachineDecorator.getMediator().getMediatorName()} v${stateMachineDecorator.getMediator().getMediatorVersion()}], ` +
    `slaCompliance=[${stateMachineDecorator.getSlaCompliancePercentage().toFixed(2)}%]`,
  );
  return stateMachineDecorator;
}

let mdbCallbackRegistered = false;

function resolveInnerSingleValue(value: number): string {
  if (!mdbCallbackRegistered && JmsInfrastructureFactoryBeanFactory.isInitialized()) {
    JmsInfrastructureFactoryBeanFactory.setMdbComputationCallback((v: number) => {
      const governanceFacade = resolveGovernanceEnforcementFacade();
      const facade = resolveResolutionFacade();
      return governanceFacade.enforceComputation(v, (w: number) => facade.resolveValue(w));
    });
    mdbCallbackRegistered = true;
  }
  const governanceFacade = resolveGovernanceEnforcementFacade();
  const facade = resolveResolutionFacade();
  return governanceFacade.enforceComputation(value, (v: number) => facade.resolveValue(v));
}

function resolveBuilderPipelineProduct(): IFizzBuzzComputationPipelineProduct {
  if (!iteratorBasedComputationInitialized) {
    FizzBuzzPipelineProductConfigurationProviderFactoryBeanFactory.createConfigurationProvider(true);
    initializeIteratorBasedComputationPipeline();
  }
  return builderPipelineProduct!;
}

let publicApiDelegate: IEnterpriseFizzBuzzPublicApiResolutionDelegate | null = null;

function resolvePublicApiDelegate(): IEnterpriseFizzBuzzPublicApiResolutionDelegate {
  if (publicApiDelegate === null) {
    publicApiDelegate = EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.createDelegate();
  }
  return publicApiDelegate!;
}

function resolveEnterpriseBusinessDelegate(): IFizzBuzzEnterpriseBusinessDelegate {
  if (!enterpriseBusinessDelegateInfrastructureInitialized) {
    initializeEnterpriseBusinessDelegateInfrastructure();
  }
  return enterpriseBusinessDelegate!;
}

function resolveBusinessDelegateServiceLocatorProxy(): IServiceLocatorManagedBusinessDelegateProxy {
  if (!enterpriseBusinessDelegateInfrastructureInitialized) {
    initializeEnterpriseBusinessDelegateInfrastructure();
  }
  return businessDelegateServiceLocatorProxy!;
}

let pipelineManager: IFizzBuzzPipelineManager | null = null;
let pipelineManagerInitialized = false;

function resolvePipelineManager(): IFizzBuzzPipelineManager {
  if (!pipelineManagerInitialized) {
    const delegationOrchestrator =
      EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory
        .getOrCreateOrchestrator();
    const delegate = resolveEnterpriseBusinessDelegate();
    pipelineManager = FizzBuzzPipelineManagerFactoryBeanFactory.createPipelineManager(
      delegationOrchestrator,
      delegate,
      FizzBuzzPipelineManagerConfigurationProfile.AUDIT_ENABLED,
    );
    pipelineManagerInitialized = true;
    console.debug(
      `[PipelineManagerInfrastructure] Enterprise pipeline manager infrastructure initialized: ` +
      `manager=[${pipelineManager.getManagerName()} v${pipelineManager.getManagerVersion()}], ` +
      `profile=[${pipelineManager.getActiveConfigurationProfile().getProfileName()}], ` +
      `visitors=[${pipelineManager.getRegisteredPipelineVisitorNames().join(", ")}], ` +
      `initialized=[${pipelineManager.isPipelineInitialized()}]`,
    );
  }
  return pipelineManager!;
}

let batchChunkOrientedJob: IBatchChunkOrientedJob<number, string> | null = null;

function resolveBatchChunkOrientedJob(
  start: number,
  end: number,
): IBatchChunkOrientedJob<number, string> {
  if (batchChunkOrientedJob === null) {
    const reader = FizzBuzzRangeItemReaderFactoryBeanFactory.createReader(start, end);
    const singleValueResolver = (value: number): string => {
      const delegate = resolveEnterpriseBusinessDelegate();
      return delegate.delegateSingleValueResolution(value);
    };
    const processor = FizzBuzzSingleValueItemProcessorFactoryBeanFactory.createProcessor(singleValueResolver);
    const writer = FizzBuzzResultItemWriterFactoryBeanFactory.createWriter();
    const configuration = FizzBuzzBatchJobConfigurationFactoryBeanFactory.createConfiguration();
    const monitor = FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory.createMonitor();
    batchChunkOrientedJob = FizzBuzzBatchChunkOrientedJobFactoryBeanFactory.createJob(
      reader,
      processor,
      writer,
      configuration,
      monitor,
    );
  }
  return batchChunkOrientedJob;
}

let pipelineManagerResolutionStrategySelector: IPipelineManagerResolutionStrategySelector | null = null;
let pipelineResolutionInfrastructureInitialized = false;

function resolvePipelineManagerResolutionStrategySelector(): IPipelineManagerResolutionStrategySelector {
  if (!pipelineResolutionInfrastructureInitialized) {
    const infrastructure =
      PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory
        .initializeResolutionStrategyInfrastructure(
          "STANDARD",
          "STANDARD",
          () => resolvePipelineManager(),
        );
    pipelineManagerResolutionStrategySelector = infrastructure.selector;
    pipelineResolutionInfrastructureInitialized = true;
    console.debug(
      `[PipelineManagerResolutionInfrastructure] Pipeline manager resolution strategy infrastructure initialized: ` +
      `selector=[${infrastructure.selector.getSelectorName()} v${infrastructure.selector.getSelectorVersion()}], ` +
      `profile=[${infrastructure.configurationProfile.getProfileName()} v${infrastructure.configurationProfile.getProfileVersion()}], ` +
      `defaultStrategy=[${infrastructure.configurationProfile.getDefaultStrategyName()}], ` +
      `registeredStrategies=[${infrastructure.selector.getRegisteredStrategyNames().join(", ")}]`,
    );
  }
  return pipelineManagerResolutionStrategySelector!;
}

function resolvePipelineManagerViaResolutionStrategy(): IFizzBuzzPipelineManager {
  const resolutionStrategySelector = resolvePipelineManagerResolutionStrategySelector();
  const resolutionStrategy = resolutionStrategySelector.selectPipelineManagerResolutionStrategy();
  return resolutionStrategy.resolvePipelineManager();
}

let endpointServiceActivator: FizzBuzzEndpointAwareServiceActivatorImpl | null = null;

function resolveEndpointServiceActivator(): FizzBuzzEndpointAwareServiceActivatorImpl {
  if (endpointServiceActivator === null) {
    const managerResolver = () => resolvePipelineManagerViaResolutionStrategy();
    if (!FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.isEndpointInfrastructureInitialized()) {
      FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.createEndpoint(
        managerResolver,
        FizzBuzzEnterpriseServiceEndpointConfigurationProfile.FULLY_INSTRUMENTED,
      );
    }
    const endpoint = FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.getEndpoint()!;
    const dispatcher = FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.getDispatcher()!;
    endpointServiceActivator = new FizzBuzzEndpointAwareServiceActivatorImpl(dispatcher, endpoint);
    console.debug(
      `[EndpointServiceActivatorResolution] Endpoint service activator resolved: ` +
      `activator=[${endpointServiceActivator.getActivatorName()} v${endpointServiceActivator.getActivatorVersion()}], ` +
      `endpoint=[${endpoint.getEndpointName()} v${endpoint.getEndpointVersion()}], ` +
      `dispatchProtocol=[${dispatcher.getDispatchProtocol()}]`,
    );
  }
  return endpointServiceActivator!;
}

export function fizzBuzzValue(value: number): string {
  const activator = resolveEndpointServiceActivator();
  return activator.activateSingleValueResolution(value);
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  const activator = resolveEndpointServiceActivator();
  return activator.activateRangeResolution(start, end);
}

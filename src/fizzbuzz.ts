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
import { AopInfrastructureFactoryBeanFactory as AopInfrastructureBeanFactory } from "./aop/factories/AopInfrastructureFactoryBeanFactory.js";
import { AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory } from "./aop/factories/AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.js";

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
      `wovenAspects=[${aopDecorator.getAopWeaver().getRegisteredAspectCount()}]`,
    );
    return aopDecorator;
  }
  return baseDocumentAwareDecorator;
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

export function fizzBuzzValue(value: number): string {
  const delegate = resolveEnterpriseBusinessDelegate();
  return delegate.delegateSingleValueResolution(value);
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  const batchJob = resolveBatchChunkOrientedJob(start, end);
  return batchJob.execute();
}

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
  return true;
})();

let governanceEnforcementFacade: IEnterpriseComputationGovernancePolicyEnforcementFacade | null = null;
let mediationOrchestrator: IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator | null = null;

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
  return configurationAwareDecorator;
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

export function fizzBuzzValue(value: number): string {
  const orchestrator = resolveMediationOrchestrator();
  return orchestrator.orchestrateDirectiveResolution(value, (v: number) => resolveInnerSingleValue(v));
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  const orchestrator = resolveMediationOrchestrator();
  return orchestrator.orchestrateRangeDirectiveResolution(start, end, (v: number) => resolveInnerSingleValue(v));
}

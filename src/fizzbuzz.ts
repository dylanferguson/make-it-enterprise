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
import { ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./impl/factories/ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
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

let messagePropertyConfigurationInitialized = false;

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
  return true;
})();

let governanceEnforcementFacade: IEnterpriseComputationGovernancePolicyEnforcementFacade | null = null;

function resolveGovernanceEnforcementFacade(): IEnterpriseComputationGovernancePolicyEnforcementFacade {
  if (governanceEnforcementFacade === null) {
    governanceEnforcementFacade =
      EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory.createGovernanceEnforcementFacade(
        EnterpriseComputationGovernanceFacadeConfigurationProfile.STANDARD,
      );
  }
  return governanceEnforcementFacade!;
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

export function fizzBuzzValue(value: number): string {
  const governanceFacade = resolveGovernanceEnforcementFacade();
  const facade = resolveResolutionFacade();
  return governanceFacade.enforceComputation(value, (v: number) => facade.resolveValue(v));
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  const governanceFacade = resolveGovernanceEnforcementFacade();
  const facade = resolveResolutionFacade();
  const results: string[] = [];
  for (let i = start; i <= end; i++) {
    const idx = i;
    results.push(
      governanceFacade.enforceComputation(idx, (v: number) => facade.resolveValue(v)),
    );
  }
  return results;
}

import { AbstractBaseEnterpriseFizzBuzzPublicApiResolutionDelegate } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzPublicApiResolutionDelegate.js";
import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "../../contracts/IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";
import type { IComputationRequestPrototype } from "../../contracts/IComputationRequestPrototype.js";
import type { IComputationRequestAdapter } from "../../contracts/IComputationRequestAdapter.js";
import { ComputationRequestPrototypeFactoryBeanFactory } from "../prototype/factories/ComputationRequestPrototypeFactoryBeanFactory.js";
import { ComputationRequestAdapterFactoryBeanFactory } from "../adapter/factories/ComputationRequestAdapterFactoryBeanFactory.js";
import { FizzBuzzResolutionFacadeConfigurationProfile, FizzBuzzResolutionFacadeFactoryBeanFactory } from "../factories/FizzBuzzResolutionFacadeFactoryBeanFactory.js";
import { EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory } from "../factories/EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.js";
import { ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory } from "../factories/ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.js";
import { InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory, InterceptionFilterChainDecoratorConfigurationProfile } from "../factories/InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.js";
import { DefaultConfigurationAwareResolutionFacadeDecoratorImpl } from "../decorators/DefaultConfigurationAwareResolutionFacadeDecoratorImpl.js";
import { EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory, EnterpriseComputationGovernanceFacadeConfigurationProfile } from "../governance/EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory.js";
import { EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory, DirectiveResolutionMediationOrchestratorConfigurationProfile } from "../factories/EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.js";

const DELEGATE_NAME = "InfrastructureManagedEnterpriseFizzBuzzPublicApiResolutionDelegate";
const DELEGATE_VERSION = "1.0.0-PUBLIC-API-DELEGATE";
const DELEGATE_TYPE = "PROTOTYPE_ADAPTER_BRIDGE_DELEGATE";

let innerResolutionDelegateCache: ((value: number) => string) | null = null;

function buildInnerResolutionDelegate(): (value: number) => string {
  if (innerResolutionDelegateCache !== null) {
    return innerResolutionDelegateCache;
  }

  const baseFacade = FizzBuzzResolutionFacadeFactoryBeanFactory.createResolutionFacade(
    FizzBuzzResolutionFacadeConfigurationProfile.STANDARD,
  );
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
  const configurationProvider =
    EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.createConfigurationProvider();
  const configurationAwareDecorator = new DefaultConfigurationAwareResolutionFacadeDecoratorImpl(
    interceptionFilterChainDecorator,
    configurationProvider,
  );

  const governanceFacade =
    EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory.createGovernanceEnforcementFacade(
      EnterpriseComputationGovernanceFacadeConfigurationProfile.STANDARD,
    );
  const orchestrator =
    EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory.createOrchestrator(
      DirectiveResolutionMediationOrchestratorConfigurationProfile.STANDARD,
    );

  innerResolutionDelegateCache = (v: number) => {
    return orchestrator.orchestrateDirectiveResolution(v, (w: number) =>
      governanceFacade.enforceComputation(w, (x: number) =>
        configurationAwareDecorator.resolveValue(x),
      ),
    );
  };
  return innerResolutionDelegateCache;
}

export class InfrastructureManagedEnterpriseFizzBuzzPublicApiResolutionDelegateImpl
  extends AbstractBaseEnterpriseFizzBuzzPublicApiResolutionDelegate
{
  protected readonly delegateName: string = DELEGATE_NAME;
  protected readonly delegateVersion: string = DELEGATE_VERSION;
  protected readonly delegateType: string = DELEGATE_TYPE;

  private readonly adapter: IComputationRequestAdapter;
  private prototypeCount: number = 0;

  constructor() {
    super();
    this.adapter = ComputationRequestAdapterFactoryBeanFactory.createAdapter();
    this.markInitialized();
  }

  override resolveSingleValue(value: number): string {
    if (!this.isDelegateInitialized()) {
      throw new Error(`[${DELEGATE_NAME}] Delegate not initialized before single value resolution: ${value}`);
    }
    const prototype = ComputationRequestPrototypeFactoryBeanFactory.createPrototype(
      value,
      `PUBLIC_API_${++this.prototypeCount}_${Date.now()}`,
    );
    const innerResolver = buildInnerResolutionDelegate();
    const result = this.adapter.adaptPrototypeToResolution(prototype, innerResolver);
    return result;
  }

  override resolveRange(start: number, end: number): readonly string[] {
    if (!this.isDelegateInitialized()) {
      throw new Error(`[${DELEGATE_NAME}] Delegate not initialized before range resolution: ${start}-${end}`);
    }
    const innerResolver = buildInnerResolutionDelegate();
    return this.adapter.adaptRangeRequest(start, end, innerResolver);
  }

  getPrototypeCount(): number {
    return ComputationRequestPrototypeFactoryBeanFactory.getPrototypeCount();
  }
}

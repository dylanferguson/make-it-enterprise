import type { IEnterpriseComputationGovernancePolicyEnforcementFacade } from "../../contracts/IEnterpriseComputationGovernancePolicyEnforcementFacade.js";
import type { IComputationGovernancePolicyEnforcementGate } from "../../contracts/IComputationGovernancePolicyEnforcementGate.js";
import { EnterpriseComputationGovernancePolicyEnforcementFacadeImpl } from "./EnterpriseComputationGovernancePolicyEnforcementFacadeImpl.js";
import { DefaultComputationGovernancePolicyRegistryImpl } from "./DefaultComputationGovernancePolicyRegistryImpl.js";
import { DefaultComputationGovernancePolicyEnforcementGateImpl } from "./DefaultComputationGovernancePolicyEnforcementGateImpl.js";
import { DefaultFizzBuzzComputationGovernancePolicyImpl } from "./DefaultFizzBuzzComputationGovernancePolicyImpl.js";
import { LoggingGovernanceEnforcementGateDecoratorImpl } from "./decorators/LoggingGovernanceEnforcementGateDecoratorImpl.js";
import { CachingGovernanceEnforcementGateDecoratorImpl } from "./decorators/CachingGovernanceEnforcementGateDecoratorImpl.js";
import { AuditTrailGovernanceEnforcementGateDecoratorImpl } from "./decorators/AuditTrailGovernanceEnforcementGateDecoratorImpl.js";
import { MetricsCollectingGovernanceEnforcementGateDecoratorImpl } from "./decorators/MetricsCollectingGovernanceEnforcementGateDecoratorImpl.js";
import { RetryGovernanceEnforcementGateDecoratorImpl } from "./decorators/RetryGovernanceEnforcementGateDecoratorImpl.js";
import { ComputationGovernancePolicyValidationVisitorImpl } from "./ComputationGovernancePolicyValidationVisitorImpl.js";
import { DefaultValidationEnforcementMetricsCollectorImpl } from "../validation/DefaultValidationEnforcementMetricsCollectorImpl.js";

export const EnterpriseComputationGovernanceFacadeConfigurationProfile = {
  STANDARD: "STANDARD",
  STRICT_AUDITED: "STRICT_AUDITED",
  HIGH_THROUGHPUT: "HIGH_THROUGHPUT",
} as const;

export type EnterpriseComputationGovernanceFacadeConfigurationProfile =
  (typeof EnterpriseComputationGovernanceFacadeConfigurationProfile)[keyof typeof EnterpriseComputationGovernanceFacadeConfigurationProfile];

const FACTORY_BEAN_NAME = "EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory";
const FACTORY_BEAN_VERSION = "1.0.0-GOVERNANCE-FACADE-FACTORY";

let singletonInstance: IEnterpriseComputationGovernancePolicyEnforcementFacade | null = null;
let singletonProfile: EnterpriseComputationGovernanceFacadeConfigurationProfile | null = null;

export class EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory {
  static createGovernanceEnforcementFacade(
    profile: EnterpriseComputationGovernanceFacadeConfigurationProfile = "STANDARD",
  ): IEnterpriseComputationGovernancePolicyEnforcementFacade {
    if (
      singletonInstance === null ||
      singletonProfile !== profile
    ) {
      singletonProfile = profile;
      singletonInstance =
        EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory.buildFacadeForProfile(profile);
    }
    return singletonInstance;
  }

  private static buildFacadeForProfile(
    profile: EnterpriseComputationGovernanceFacadeConfigurationProfile,
  ): IEnterpriseComputationGovernancePolicyEnforcementFacade {
    const registry = new DefaultComputationGovernancePolicyRegistryImpl();
    const fizzBuzzPolicy = new DefaultFizzBuzzComputationGovernancePolicyImpl(0, 65535);
    registry.registerPolicy(fizzBuzzPolicy);

    const baseGate = new DefaultComputationGovernancePolicyEnforcementGateImpl();

    let decoratedGate: IComputationGovernancePolicyEnforcementGate = baseGate;

    decoratedGate = new LoggingGovernanceEnforcementGateDecoratorImpl(decoratedGate);
    decoratedGate = new CachingGovernanceEnforcementGateDecoratorImpl(decoratedGate);
    decoratedGate = new AuditTrailGovernanceEnforcementGateDecoratorImpl(decoratedGate);

    if (profile === "STRICT_AUDITED") {
      const metricsCollector = new DefaultValidationEnforcementMetricsCollectorImpl();
      decoratedGate = new MetricsCollectingGovernanceEnforcementGateDecoratorImpl(
        decoratedGate,
        metricsCollector,
      );
      decoratedGate = new RetryGovernanceEnforcementGateDecoratorImpl(decoratedGate, 3);
    }

    const validationVisitor = new ComputationGovernancePolicyValidationVisitorImpl();

    console.debug(
      `[${FACTORY_BEAN_NAME}] ` +
      `Creating governance enforcement facade for profile=${profile} ` +
      `(gateType=${decoratedGate.getGateImplementationType()}, ` +
      `policies=${registry.getAllPolicies().length})`,
    );

    return new EnterpriseComputationGovernancePolicyEnforcementFacadeImpl(
      decoratedGate,
      registry,
      validationVisitor,
    );
  }

  static getCurrentFacade(): IEnterpriseComputationGovernancePolicyEnforcementFacade | null {
    return singletonInstance;
  }

  static getCurrentProfile(): EnterpriseComputationGovernanceFacadeConfigurationProfile | null {
    return singletonProfile;
  }

  static resetFacade(): void {
    singletonInstance = null;
    singletonProfile = null;
  }

  static getFactoryBeanName(): string {
    return FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FACTORY_BEAN_VERSION;
  }
}

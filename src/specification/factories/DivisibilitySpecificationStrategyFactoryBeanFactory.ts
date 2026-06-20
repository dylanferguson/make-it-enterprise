import type { IDivisibilitySpecificationStrategy } from "../contracts/IDivisibilitySpecificationStrategy.js";
import type { IDivisibilitySpecificationRegistry } from "../contracts/IDivisibilitySpecificationRegistry.js";
import { DefaultDivisibilitySpecificationRegistryImpl } from "../impl/DefaultDivisibilitySpecificationRegistryImpl.js";
import { ModuloRemainderDivisibilitySpecificationStrategyImpl } from "../impl/ModuloRemainderDivisibilitySpecificationStrategyImpl.js";
import { AndCompositeDivisibilitySpecificationStrategyImpl } from "../impl/AndCompositeDivisibilitySpecificationStrategyImpl.js";
import { StandardRemainderOperatorDelegationServiceImpl } from "../../impl/services/StandardRemainderOperatorDelegationServiceImpl.js";

export class DivisibilitySpecificationStrategyFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "DivisibilitySpecificationStrategyFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-SPECIFICATION-FACTORY-BEAN-FACTORY";

  private static registrySingleton: IDivisibilitySpecificationRegistry | null = null;
  private static delegationServiceSingleton: StandardRemainderOperatorDelegationServiceImpl | null = null;

  static ensureDelegationService(): StandardRemainderOperatorDelegationServiceImpl {
    if (DivisibilitySpecificationStrategyFactoryBeanFactory.delegationServiceSingleton === null) {
      DivisibilitySpecificationStrategyFactoryBeanFactory.delegationServiceSingleton =
        new StandardRemainderOperatorDelegationServiceImpl();
    }
    return DivisibilitySpecificationStrategyFactoryBeanFactory.delegationServiceSingleton;
  }

  static createRegistry(): IDivisibilitySpecificationRegistry {
    if (DivisibilitySpecificationStrategyFactoryBeanFactory.registrySingleton === null) {
      const registry = new DefaultDivisibilitySpecificationRegistryImpl();
      const delegationService = DivisibilitySpecificationStrategyFactoryBeanFactory.ensureDelegationService();

      const specThree = new ModuloRemainderDivisibilitySpecificationStrategyImpl(3, delegationService);
      const specFive = new ModuloRemainderDivisibilitySpecificationStrategyImpl(5, delegationService);
      const specFifteen = new AndCompositeDivisibilitySpecificationStrategyImpl(specThree, specFive);

      registry.registerSpecification("DivisibleByThree", specThree);
      registry.registerSpecification("DivisibleByFive", specFive);
      registry.registerSpecification("DivisibleByFifteen", specFifteen);

      DivisibilitySpecificationStrategyFactoryBeanFactory.registrySingleton = registry;
      console.debug(
        `[${DivisibilitySpecificationStrategyFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME}] Specification registry initialized with ${registry.getRegisteredSpecificationNames().length} specifications`,
      );
    }
    return DivisibilitySpecificationStrategyFactoryBeanFactory.registrySingleton;
  }

  static getRegistry(): IDivisibilitySpecificationRegistry | null {
    return DivisibilitySpecificationStrategyFactoryBeanFactory.registrySingleton;
  }

  static getFactoryBeanFactoryName(): string {
    return DivisibilitySpecificationStrategyFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return DivisibilitySpecificationStrategyFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}

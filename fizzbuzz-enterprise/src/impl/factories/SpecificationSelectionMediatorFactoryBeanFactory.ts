import type { ISpecificationSelectionMediator } from "../../contracts/ISpecificationSelectionMediator.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";
import { StandardSpecificationSelectionMediatorImpl } from "../mediator/StandardSpecificationSelectionMediatorImpl.js";
import { StandardSpecificationEnforcementChainImpl } from "../chains/StandardSpecificationEnforcementChainImpl.js";
import { ValidationSpecificationEnforcementChainLinkImpl } from "../handlers/ValidationSpecificationEnforcementChainLinkImpl.js";
import { ResolutionSpecificationEnforcementChainLinkImpl } from "../handlers/ResolutionSpecificationEnforcementChainLinkImpl.js";
import { DivisibleBySpecificationProviderStrategyImpl } from "../providers/DivisibleBySpecificationProviderStrategyImpl.js";

export class SpecificationSelectionMediatorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "SpecificationSelectionMediatorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MEDIATOR-FACTORY-BEAN";

  private static instance: ISpecificationSelectionMediator | null = null;

  static createMediator(
    divisibilityEvaluator: IDivisibilityEvaluator | null,
  ): ISpecificationSelectionMediator {
    if (
      SpecificationSelectionMediatorFactoryBeanFactory.instance === null ||
      divisibilityEvaluator !== null
    ) {
      const mediator = new StandardSpecificationSelectionMediatorImpl();
      const enforcementChain = new StandardSpecificationEnforcementChainImpl();
      enforcementChain.addChainLink(new ValidationSpecificationEnforcementChainLinkImpl());
      enforcementChain.addChainLink(new ResolutionSpecificationEnforcementChainLinkImpl());
      mediator.registerEnforcementChain(enforcementChain);

      if (divisibilityEvaluator !== null) {
        const providerStrategy = new DivisibleBySpecificationProviderStrategyImpl(
          divisibilityEvaluator,
        );
        mediator.registerProviderStrategy(providerStrategy);
      }

      SpecificationSelectionMediatorFactoryBeanFactory.instance = mediator;
    }
    return SpecificationSelectionMediatorFactoryBeanFactory.instance;
  }

  static resetMediator(): void {
    SpecificationSelectionMediatorFactoryBeanFactory.instance = null;
  }

  static isInitialized(): boolean {
    return SpecificationSelectionMediatorFactoryBeanFactory.instance !== null;
  }

  static getFactoryBeanName(): string {
    return SpecificationSelectionMediatorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return SpecificationSelectionMediatorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

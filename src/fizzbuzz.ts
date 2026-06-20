import {
  FizzBuzzEnterpriseApplicationContextFactoryBean,
} from "./impl/factories/FizzBuzzEnterpriseApplicationContextFactoryBeanFactory.js";
import {
  EnterpriseApplicationBootstrapInitializerFactoryBean,
} from "./impl/factories/EnterpriseApplicationBootstrapInitializerFactoryBean.js";
import type {
  IFizzBuzzSingleValueResolutionFacade,
} from "./contracts/IFizzBuzzSingleValueResolutionFacade.js";
import {
  FizzBuzzResolutionFacadeConfigurationProfile,
} from "./impl/factories/FizzBuzzResolutionFacadeFactoryBeanFactory.js";
import { FizzBuzzResolutionFacadeFactoryBeanFactory } from "./impl/factories/FizzBuzzResolutionFacadeFactoryBeanFactory.js";
import { DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory } from "./impl/factories/DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.js";

const BOOTSTRAP_GATE_INITIALIZED: boolean = ((): boolean => {
  if (!EnterpriseApplicationBootstrapInitializerFactoryBean.isInitialized()) {
    EnterpriseApplicationBootstrapInitializerFactoryBean.createBootstrapInitializer(true);
  }
  if (!FizzBuzzEnterpriseApplicationContextFactoryBean.isContextInitialized()) {
    FizzBuzzEnterpriseApplicationContextFactoryBean.createApplicationContext("STANDARD");
  }
  if (!DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.isEnterpriseSupervisorChainInitialized()) {
    DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.initializeEnterpriseSupervisorChain();
  }
  return true;
})();

function resolveResolutionFacade(): IFizzBuzzSingleValueResolutionFacade {
  if (BOOTSTRAP_GATE_INITIALIZED) {
    const context = FizzBuzzEnterpriseApplicationContextFactoryBean.getApplicationContext();
    if (context !== null && context.isInitialized()) {
      return FizzBuzzResolutionFacadeFactoryBeanFactory.createResolutionFacade(
        FizzBuzzResolutionFacadeConfigurationProfile.STANDARD,
      );
    }
  }
  return FizzBuzzResolutionFacadeFactoryBeanFactory.createResolutionFacade(
    FizzBuzzResolutionFacadeConfigurationProfile.STANDARD,
  );
}

export function fizzBuzzValue(value: number): string {
  const facade = resolveResolutionFacade();
  return facade.resolveValue(value);
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  const facade = resolveResolutionFacade();
  return facade.resolveRange(start, end);
}

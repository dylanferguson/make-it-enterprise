import { AbstractBaseEnterpriseServiceLocatorRegistrationBean } from "../../abstracts/AbstractBaseEnterpriseServiceLocatorRegistrationBean.js";
import type { IModuloEvaluationStrategyFactoryBeanRegistry } from "../../contracts/IModuloEvaluationStrategyFactoryBeanRegistry.js";

const FIZZBUZZ_MODULO_BEAN_DEFINITIONS: Array<{ divisor: number; factoryBeanName: string }> = [
  { divisor: 3, factoryBeanName: "StandardRemainderModuloEvaluationStrategyFactoryBean" },
  { divisor: 5, factoryBeanName: "StandardRemainderModuloEvaluationStrategyFactoryBean" },
  { divisor: 15, factoryBeanName: "CompositeFizzBuzzModuloEvaluationStrategyFactoryBean" },
  { divisor: 1, factoryBeanName: "IdentityModuloEvaluationStrategyFactoryBean" },
];

export class ProgrammaticModuloRegistrationBeanImpl extends AbstractBaseEnterpriseServiceLocatorRegistrationBean {
  private static readonly REGISTRATION_BEAN_NAME = "ProgrammaticModuloRegistrationBean";
  private static readonly REGISTRATION_BEAN_VERSION = "1.0.0-REGISTRATION";
  private static readonly BEAN_DEFINITION_SOURCE = "ProgrammaticModuloRegistrationBeanImpl (static bean definitions)";

  override registerFactoryBeans(registry: IModuloEvaluationStrategyFactoryBeanRegistry): void {
    for (const def of FIZZBUZZ_MODULO_BEAN_DEFINITIONS) {
      this.validateDivisor(def.divisor);
      registry.registerFactoryBean(def.divisor, def.factoryBeanName);
    }
    console.debug(
      `[${this.getRegistrationBeanName()}] Registered ${FIZZBUZZ_MODULO_BEAN_DEFINITIONS.length} factory bean definitions`,
    );
  }

  override getRegistrationBeanName(): string {
    return ProgrammaticModuloRegistrationBeanImpl.REGISTRATION_BEAN_NAME;
  }

  override getRegistrationBeanVersion(): string {
    return ProgrammaticModuloRegistrationBeanImpl.REGISTRATION_BEAN_VERSION;
  }

  override getBeanDefinitionSource(): string {
    return ProgrammaticModuloRegistrationBeanImpl.BEAN_DEFINITION_SOURCE;
  }
}

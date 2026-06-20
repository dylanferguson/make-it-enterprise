import { InMemoryDivisibilityModuloEvaluationFactoryBeanRegistryImpl } from "../registry/InMemoryDivisibilityModuloEvaluationFactoryBeanRegistryImpl.js";
import type { IDivisibilityModuloEvaluationFactoryBeanRegistry } from "./IDivisibilityModuloEvaluationFactoryBeanRegistry.js";
import type { IDivisibilityModuloEvaluationStrategyProvider } from "../contracts/IDivisibilityModuloEvaluationStrategyProvider.js";
import { ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl } from "../impl/ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl.js";
import { StandardDivisibilityModuloEvaluationFactoryBeanImpl } from "../impl/StandardDivisibilityModuloEvaluationFactoryBeanImpl.js";

export class DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PROVIDER-FACTORY";

  private static provider: IDivisibilityModuloEvaluationStrategyProvider | null = null;
  private static registry: IDivisibilityModuloEvaluationFactoryBeanRegistry | null = null;
  private static initialized = false;

  static initializeProviderInfrastructure(): IDivisibilityModuloEvaluationStrategyProvider {
    if (DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.initialized) {
      return DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.provider!;
    }

    const reg = new InMemoryDivisibilityModuloEvaluationFactoryBeanRegistryImpl();

    const fizzFactoryBean = new StandardDivisibilityModuloEvaluationFactoryBeanImpl(
      "FizzDivisibilityModuloEvaluationFactoryBean",
      3,
    );
    const buzzFactoryBean = new StandardDivisibilityModuloEvaluationFactoryBeanImpl(
      "BuzzDivisibilityModuloEvaluationFactoryBean",
      5,
    );
    const fizzBuzzFactoryBean = new StandardDivisibilityModuloEvaluationFactoryBeanImpl(
      "FizzBuzzDivisibilityModuloEvaluationFactoryBean",
      15,
    );
    const identityFactoryBean = new StandardDivisibilityModuloEvaluationFactoryBeanImpl(
      "IdentityDivisibilityModuloEvaluationFactoryBean",
      1,
    );

    reg.registerFactoryBean(3, fizzFactoryBean);
    reg.registerFactoryBean(5, buzzFactoryBean);
    reg.registerFactoryBean(15, fizzBuzzFactoryBean);
    reg.registerFactoryBean(1, identityFactoryBean);

    const prov = new ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl();
    prov.setRegistry(reg);

    DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.registry = reg;
    DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.provider = prov;
    DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.initialized = true;

    console.debug(
      `[${DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.FACTORY_BEAN_NAME} v${DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Provider infrastructure initialized: ` +
      `provider=[${prov.getProviderName()} v${prov.getProviderVersion()}], ` +
      `registry=[${reg.getRegistryName()} v${reg.getRegistryVersion()}], ` +
      `factoryBeans=[${reg.getFactoryBeanCount()}], ` +
      `divisors=[${reg.getRegisteredDivisors().join(", ")}]`,
    );

    return prov;
  }

  static getProvider(): IDivisibilityModuloEvaluationStrategyProvider | null {
    return DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.provider;
  }

  static getRegistry(): IDivisibilityModuloEvaluationFactoryBeanRegistry | null {
    return DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.registry;
  }

  static isInitialized(): boolean {
    return DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.initialized;
  }

  static resetInfrastructure(): void {
    DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.provider = null;
    DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.registry = null;
    DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.initialized = false;
  }
}

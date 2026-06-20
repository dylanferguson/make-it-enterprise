import { InMemoryModularArithmeticDivisibilityResolutionMediatorRegistryImpl } from "../impl/InMemoryModularArithmeticDivisibilityResolutionMediatorRegistryImpl.js";
import type { IModularArithmeticDivisibilityResolutionMediatorRegistry } from "../contracts/IModularArithmeticDivisibilityResolutionMediatorRegistry.js";
import type { IModularArithmeticDivisibilityResolutionMediatorProvider } from "../contracts/IModularArithmeticDivisibilityResolutionMediatorProvider.js";
import { ServiceLocatorManagedModularArithmeticDivisibilityResolutionMediatorProviderImpl } from "../impl/ServiceLocatorManagedModularArithmeticDivisibilityResolutionMediatorProviderImpl.js";
import { StandardModularArithmeticDivisibilityResolutionMediatorFactoryBeanImpl } from "../impl/factories/StandardModularArithmeticDivisibilityResolutionMediatorFactoryBeanImpl.js";
import type { IModularArithmeticDivisibilityResolutionMediationVisitor } from "../contracts/IModularArithmeticDivisibilityResolutionMediationVisitor.js";
import { DelegatingModularArithmeticDivisibilityResolutionMediationVisitorImpl } from "../impl/visitors/DelegatingModularArithmeticDivisibilityResolutionMediationVisitorImpl.js";

export class ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MEDIATOR-ARCHITECTURE-FACTORY";

  private static provider: IModularArithmeticDivisibilityResolutionMediatorProvider | null = null;
  private static registry: IModularArithmeticDivisibilityResolutionMediatorRegistry | null = null;
  private static visitor: IModularArithmeticDivisibilityResolutionMediationVisitor | null = null;
  private static initialized = false;

  static initializeArchitecture(): {
    provider: IModularArithmeticDivisibilityResolutionMediatorProvider;
    registry: IModularArithmeticDivisibilityResolutionMediatorRegistry;
    visitor: IModularArithmeticDivisibilityResolutionMediationVisitor;
  } {
    if (ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.initialized) {
      return {
        provider: ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.provider!,
        registry: ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.registry!,
        visitor: ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.visitor!,
      };
    }

    const reg = new InMemoryModularArithmeticDivisibilityResolutionMediatorRegistryImpl();

    const threeFactoryBean = new StandardModularArithmeticDivisibilityResolutionMediatorFactoryBeanImpl(
      "ModuloThreeMediatorFactoryBean",
      3,
    );
    const fiveFactoryBean = new StandardModularArithmeticDivisibilityResolutionMediatorFactoryBeanImpl(
      "ModuloFiveMediatorFactoryBean",
      5,
    );
    const fifteenFactoryBean = new StandardModularArithmeticDivisibilityResolutionMediatorFactoryBeanImpl(
      "ModuloFifteenMediatorFactoryBean",
      15,
    );

    reg.registerMediatorFactoryBean(3, threeFactoryBean);
    reg.registerMediatorFactoryBean(5, fiveFactoryBean);
    reg.registerMediatorFactoryBean(15, fifteenFactoryBean);

    const prov = new ServiceLocatorManagedModularArithmeticDivisibilityResolutionMediatorProviderImpl();
    prov.setMediatorRegistry(reg);

    const vis = new DelegatingModularArithmeticDivisibilityResolutionMediationVisitorImpl(prov);

    ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.registry = reg;
    ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.provider = prov;
    ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.visitor = vis;
    ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.initialized = true;

    console.debug(
      `[${ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.FACTORY_BEAN_NAME} v${ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Modular arithmetic divisibility resolution mediator architecture initialized: ` +
      `provider=[${prov.getProviderName()} v${prov.getProviderVersion()}], ` +
      `registry=[${reg.getRegistryName()} v${reg.getRegistryVersion()}], ` +
      `visitor=[${vis.getVisitorName()} v${vis.getVisitorVersion()}], ` +
      `registeredMediators=[${reg.getRegisteredDivisors().join(", ")}]`,
    );

    return { provider: prov, registry: reg, visitor: vis };
  }

  static getProvider(): IModularArithmeticDivisibilityResolutionMediatorProvider | null {
    return ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.provider;
  }

  static getRegistry(): IModularArithmeticDivisibilityResolutionMediatorRegistry | null {
    return ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.registry;
  }

  static getVisitor(): IModularArithmeticDivisibilityResolutionMediationVisitor | null {
    return ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.visitor;
  }

  static isInitialized(): boolean {
    return ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.initialized;
  }

  static resetArchitecture(): void {
    ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.provider = null;
    ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.registry = null;
    ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.visitor = null;
    ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.initialized = false;
  }
}

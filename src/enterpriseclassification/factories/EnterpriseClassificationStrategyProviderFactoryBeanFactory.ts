import type { IEnterpriseClassificationStrategyProvider } from "../contracts/index.js";
import { DefaultEnterpriseClassificationStrategyProviderImpl } from "../impl/provider/DefaultEnterpriseClassificationStrategyProviderImpl.js";
import type { IEnterpriseClassificationChainHandler } from "../contracts/index.js";
import type { IEnterpriseClassificationVisitor } from "../contracts/index.js";
import type { IEnterpriseClassificationRegistry } from "../contracts/index.js";
import { DivisibleByThreeClassificationChainHandlerImpl } from "../impl/handlers/DivisibleByThreeClassificationChainHandlerImpl.js";
import { DivisibleByFiveClassificationChainHandlerImpl } from "../impl/handlers/DivisibleByFiveClassificationChainHandlerImpl.js";
import { StandardEnterpriseClassificationVisitorImpl } from "../impl/visitors/StandardEnterpriseClassificationVisitorImpl.js";

export class EnterpriseClassificationStrategyProviderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseClassificationStrategyProviderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ECSPFBF";

  private static providerSingleton: IEnterpriseClassificationStrategyProvider | null = null;
  private static registrySingleton: IEnterpriseClassificationRegistry | null = null;
  private static visitorSingleton: IEnterpriseClassificationVisitor | null = null;
  private static factoryInitialized = false;

  static initializeClassificationInfrastructure(): IEnterpriseClassificationStrategyProvider {
    if (EnterpriseClassificationStrategyProviderFactoryBeanFactory.factoryInitialized) {
      return EnterpriseClassificationStrategyProviderFactoryBeanFactory.providerSingleton!;
    }
    const provider = new DefaultEnterpriseClassificationStrategyProviderImpl();
    const registry = provider.getClassificationRegistry();
    const threeHandler = new DivisibleByThreeClassificationChainHandlerImpl();
    const fiveHandler = new DivisibleByFiveClassificationChainHandlerImpl();
    registry.registerHandler(threeHandler, threeHandler.getHandlerPriority());
    registry.registerHandler(fiveHandler, fiveHandler.getHandlerPriority());
    provider.registerClassificationDefinition(3, "Fizz");
    provider.registerClassificationDefinition(5, "Buzz");
    provider.registerClassificationDefinition(15, "FizzBuzz");
    const visitor = new StandardEnterpriseClassificationVisitorImpl(registry);
    EnterpriseClassificationStrategyProviderFactoryBeanFactory.providerSingleton = provider;
    EnterpriseClassificationStrategyProviderFactoryBeanFactory.registrySingleton = registry;
    EnterpriseClassificationStrategyProviderFactoryBeanFactory.visitorSingleton = visitor;
    EnterpriseClassificationStrategyProviderFactoryBeanFactory.factoryInitialized = true;
    console.debug(
      `[${EnterpriseClassificationStrategyProviderFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseClassificationStrategyProviderFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Enterprise classification infrastructure initialized: ` +
      `provider=[${provider.getProviderName()} v${provider.getProviderVersion()}], ` +
      `registry=[${registry.getRegistryName()} v${registry.getRegistryVersion()}], ` +
      `visitor=[${visitor.getVisitorName()} v${visitor.getVisitorVersion()}], ` +
      `registeredDivisors=[${provider.getRegisteredClassificationDivisors().join(", ")}], ` +
      `handlers=[${registry.getHandlerCount()}], ` +
      `chainHead=[${registry.getChainHead()?.getHandlerName() ?? "null"}]`,
    );
    return provider;
  }

  static getProvider(): IEnterpriseClassificationStrategyProvider | null {
    return EnterpriseClassificationStrategyProviderFactoryBeanFactory.providerSingleton;
  }

  static getRegistry(): IEnterpriseClassificationRegistry | null {
    return EnterpriseClassificationStrategyProviderFactoryBeanFactory.registrySingleton;
  }

  static getVisitor(): IEnterpriseClassificationVisitor | null {
    return EnterpriseClassificationStrategyProviderFactoryBeanFactory.visitorSingleton;
  }

  static isInfrastructureInitialized(): boolean {
    return EnterpriseClassificationStrategyProviderFactoryBeanFactory.factoryInitialized;
  }

  static resetInfrastructure(): void {
    EnterpriseClassificationStrategyProviderFactoryBeanFactory.providerSingleton = null;
    EnterpriseClassificationStrategyProviderFactoryBeanFactory.registrySingleton = null;
    EnterpriseClassificationStrategyProviderFactoryBeanFactory.visitorSingleton = null;
    EnterpriseClassificationStrategyProviderFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseClassificationStrategyProviderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseClassificationStrategyProviderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

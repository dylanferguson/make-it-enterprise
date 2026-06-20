import { EnterpriseFizzOutputCompositeLeafImpl } from "../impl/components/EnterpriseFizzOutputCompositeLeafImpl.js";
import { EnterpriseBuzzOutputCompositeLeafImpl } from "../impl/components/EnterpriseBuzzOutputCompositeLeafImpl.js";
import { EnterpriseFizzBuzzOutputCompositeCompositeImpl } from "../impl/components/EnterpriseFizzBuzzOutputCompositeCompositeImpl.js";
import { EnterpriseNumberOutputCompositeLeafImpl } from "../impl/components/EnterpriseNumberOutputCompositeLeafImpl.js";
import { EnterpriseOutputCompositeResolutionVisitorImpl } from "../impl/visitors/EnterpriseOutputCompositeResolutionVisitorImpl.js";
import { EnterpriseOutputCompositeStrategyProviderImpl } from "../impl/provider/EnterpriseOutputCompositeStrategyProviderImpl.js";
import { InMemoryEnterpriseOutputCompositeRegistryImpl } from "../impl/registry/InMemoryEnterpriseOutputCompositeRegistryImpl.js";
import type { IEnterpriseOutputCompositeStrategyProvider } from "../contracts/IEnterpriseOutputCompositeStrategyProvider.js";
import type { IEnterpriseOutputCompositeVisitor } from "../contracts/IEnterpriseOutputCompositeVisitor.js";
import type { IEnterpriseOutputCompositeRegistry } from "../contracts/IEnterpriseOutputCompositeRegistry.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import { EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl } from "../impl/decorators/EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl.js";

export class EnterpriseOutputCompositeComponentFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "EnterpriseOutputCompositeComponentFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION =
    "1.0.0-COMPOSITE-COMPONENT-FACTORY";

  private static fizzLeaf: EnterpriseFizzOutputCompositeLeafImpl | null = null;
  private static buzzLeaf: EnterpriseBuzzOutputCompositeLeafImpl | null = null;
  private static fizzBuzzComposite: EnterpriseFizzBuzzOutputCompositeCompositeImpl | null = null;
  private static numberLeaf: EnterpriseNumberOutputCompositeLeafImpl | null = null;
  private static initialized = false;

  static initializeComponentInfrastructure(): {
    fizzLeaf: EnterpriseFizzOutputCompositeLeafImpl;
    buzzLeaf: EnterpriseBuzzOutputCompositeLeafImpl;
    fizzBuzzComposite: EnterpriseFizzBuzzOutputCompositeCompositeImpl;
    numberLeaf: EnterpriseNumberOutputCompositeLeafImpl;
  } {
    if (
      EnterpriseOutputCompositeComponentFactoryBeanFactory.initialized &&
      EnterpriseOutputCompositeComponentFactoryBeanFactory.fizzLeaf !== null
    ) {
      return {
        fizzLeaf: EnterpriseOutputCompositeComponentFactoryBeanFactory.fizzLeaf,
        buzzLeaf: EnterpriseOutputCompositeComponentFactoryBeanFactory.buzzLeaf!,
        fizzBuzzComposite:
          EnterpriseOutputCompositeComponentFactoryBeanFactory.fizzBuzzComposite!,
        numberLeaf:
          EnterpriseOutputCompositeComponentFactoryBeanFactory.numberLeaf!,
      };
    }

    const fizz = new EnterpriseFizzOutputCompositeLeafImpl();
    const buzz = new EnterpriseBuzzOutputCompositeLeafImpl();
    const number = new EnterpriseNumberOutputCompositeLeafImpl();
    const fizzBuzz = new EnterpriseFizzBuzzOutputCompositeCompositeImpl([
      fizz,
      buzz,
    ]);

    EnterpriseOutputCompositeComponentFactoryBeanFactory.fizzLeaf = fizz;
    EnterpriseOutputCompositeComponentFactoryBeanFactory.buzzLeaf = buzz;
    EnterpriseOutputCompositeComponentFactoryBeanFactory.fizzBuzzComposite =
      fizzBuzz;
    EnterpriseOutputCompositeComponentFactoryBeanFactory.numberLeaf = number;
    EnterpriseOutputCompositeComponentFactoryBeanFactory.initialized = true;

    return { fizzLeaf: fizz, buzzLeaf: buzz, fizzBuzzComposite: fizzBuzz, numberLeaf: number };
  }

  static getFizzLeaf(): EnterpriseFizzOutputCompositeLeafImpl | null {
    return EnterpriseOutputCompositeComponentFactoryBeanFactory.fizzLeaf;
  }

  static getBuzzLeaf(): EnterpriseBuzzOutputCompositeLeafImpl | null {
    return EnterpriseOutputCompositeComponentFactoryBeanFactory.buzzLeaf;
  }

  static getFizzBuzzComposite(): EnterpriseFizzBuzzOutputCompositeCompositeImpl | null {
    return EnterpriseOutputCompositeComponentFactoryBeanFactory.fizzBuzzComposite;
  }

  static getNumberLeaf(): EnterpriseNumberOutputCompositeLeafImpl | null {
    return EnterpriseOutputCompositeComponentFactoryBeanFactory.numberLeaf;
  }

  static isInitialized(): boolean {
    return EnterpriseOutputCompositeComponentFactoryBeanFactory.initialized;
  }

  static getFactoryBeanName(): string {
    return EnterpriseOutputCompositeComponentFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseOutputCompositeComponentFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

export class EnterpriseOutputCompositeVisitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "EnterpriseOutputCompositeVisitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION =
    "1.0.0-COMPOSITE-VISITOR-FACTORY";

  private static visitor: EnterpriseOutputCompositeResolutionVisitorImpl | null =
    null;

  static createVisitor(): EnterpriseOutputCompositeResolutionVisitorImpl {
    if (
      EnterpriseOutputCompositeVisitorFactoryBeanFactory.visitor === null
    ) {
      EnterpriseOutputCompositeVisitorFactoryBeanFactory.visitor =
        new EnterpriseOutputCompositeResolutionVisitorImpl();
    }
    return EnterpriseOutputCompositeVisitorFactoryBeanFactory.visitor;
  }

  static getVisitor(): EnterpriseOutputCompositeResolutionVisitorImpl | null {
    return EnterpriseOutputCompositeVisitorFactoryBeanFactory.visitor;
  }

  static getFactoryBeanName(): string {
    return EnterpriseOutputCompositeVisitorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseOutputCompositeVisitorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

export class EnterpriseOutputCompositeRegistryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "EnterpriseOutputCompositeRegistryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION =
    "1.0.0-COMPOSITE-REGISTRY-FACTORY";

  private static registry: InMemoryEnterpriseOutputCompositeRegistryImpl | null =
    null;

  static createRegistry(): InMemoryEnterpriseOutputCompositeRegistryImpl {
    if (
      EnterpriseOutputCompositeRegistryFactoryBeanFactory.registry === null
    ) {
      EnterpriseOutputCompositeRegistryFactoryBeanFactory.registry =
        new InMemoryEnterpriseOutputCompositeRegistryImpl();
    }
    return EnterpriseOutputCompositeRegistryFactoryBeanFactory.registry;
  }

  static getRegistry(): InMemoryEnterpriseOutputCompositeRegistryImpl | null {
    return EnterpriseOutputCompositeRegistryFactoryBeanFactory.registry;
  }

  static getFactoryBeanName(): string {
    return EnterpriseOutputCompositeRegistryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseOutputCompositeRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

export class EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION =
    "1.0.0-COMPOSITE-STRATEGY-PROVIDER-FACTORY";

  private static provider: EnterpriseOutputCompositeStrategyProviderImpl | null =
    null;
  private static initialized = false;

  static initializeProviderInfrastructure(): EnterpriseOutputCompositeStrategyProviderImpl {
    if (
      EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.initialized &&
      EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.provider !==
        null
    ) {
      return EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.provider;
    }

    const components =
      EnterpriseOutputCompositeComponentFactoryBeanFactory.initializeComponentInfrastructure();
    const visitor =
      EnterpriseOutputCompositeVisitorFactoryBeanFactory.createVisitor();
    const registry =
      EnterpriseOutputCompositeRegistryFactoryBeanFactory.createRegistry();

    registry.registerComponent(components.fizzLeaf);
    registry.registerComponent(components.buzzLeaf);
    registry.registerComponent(components.fizzBuzzComposite);
    registry.registerComponent(components.numberLeaf);

    const provider = new EnterpriseOutputCompositeStrategyProviderImpl(visitor);
    provider.setRegistry(registry);

    EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.provider =
      provider;
    EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.initialized =
      true;

    console.debug(
      `[EnterpriseOutputCompositeInfrastructure] Output composite strategy provider infrastructure initialized: ` +
        `provider=[${provider.getProviderName()} v${provider.getProviderVersion()}], ` +
        `visitor=[${visitor.getVisitorName()} v${visitor.getVisitorVersion()}], ` +
        `registry=[${registry.getRegistryName()} v${registry.getRegistryVersion()}], ` +
        `components=[${registry.getRegisteredComponentNames().join(", ")}], ` +
        `factory=[${EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.FACTORY_BEAN_VERSION}]`,
    );

    return provider;
  }

  static getProvider(): EnterpriseOutputCompositeStrategyProviderImpl | null {
    return EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.provider;
  }

  static isInitialized(): boolean {
    return EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.initialized;
  }

  static getFactoryBeanName(): string {
    return EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

export class EnterpriseOutputCompositeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "EnterpriseOutputCompositeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION =
    "1.0.0-COMPOSITE-DECORATOR-FACTORY";

  private static readonly DECORATOR_PRIORITY = 900;

  static createDecorator(
    wrappedCommand: IFizzBuzzComputationCommand,
  ): EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl {
    const provider =
      EnterpriseOutputCompositeStrategyProviderFactoryBeanFactory.initializeProviderInfrastructure();
    return new EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl(
      wrappedCommand,
      provider,
    );
  }

  static getDecoratorPriority(): number {
    return EnterpriseOutputCompositeDecoratorFactoryBeanFactory.DECORATOR_PRIORITY;
  }

  static getFactoryBeanName(): string {
    return EnterpriseOutputCompositeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseOutputCompositeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

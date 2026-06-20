import type {
  IEnterpriseComputationResultPostProcessor,
  IEnterpriseComputationResultPostProcessorChainHandler,
  IEnterpriseComputationResultPostProcessorRegistry,
  IEnterpriseComputationResultPostProcessorProvider,
  IComputationResultPostProcessorArchitectureFactoryBean,
} from "../contracts/IEnterpriseComputationResultPostProcessor.js";
import { PassThroughComputationResultPostProcessorImpl } from "../impl/PassThroughComputationResultPostProcessorImpl.js";
import { ValidatingComputationResultPostProcessorImpl } from "../impl/ValidatingComputationResultPostProcessorImpl.js";
import { ChainOfResponsibilityComputationResultPostProcessorImpl } from "../impl/ChainOfResponsibilityComputationResultPostProcessorImpl.js";

class DefaultEnterpriseComputationResultPostProcessorRegistryImpl
  implements IEnterpriseComputationResultPostProcessorRegistry
{
  private static readonly REGISTRY_NAME = "DefaultEnterpriseComputationResultPostProcessorRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-POST-PROCESSOR-REGISTRY";
  private readonly processors: Map<string, IEnterpriseComputationResultPostProcessor> = new Map();

  getRegistryName(): string { return DefaultEnterpriseComputationResultPostProcessorRegistryImpl.REGISTRY_NAME; }
  getRegistryVersion(): string { return DefaultEnterpriseComputationResultPostProcessorRegistryImpl.REGISTRY_VERSION; }

  registerProcessor(processor: IEnterpriseComputationResultPostProcessor): void {
    this.processors.set(processor.getProcessorName(), processor);
  }

  unregisterProcessor(processorName: string): boolean {
    return this.processors.delete(processorName);
  }

  getRegisteredProcessors(): readonly IEnterpriseComputationResultPostProcessor[] {
    return Array.from(this.processors.values()).sort((a, b) => a.getProcessorPriority() - b.getProcessorPriority());
  }

  getProcessorCount(): number { return this.processors.size; }

  getProcessorByName(name: string): IEnterpriseComputationResultPostProcessor | null {
    return this.processors.get(name) ?? null;
  }
}

class DefaultEnterpriseComputationResultPostProcessorChainHandlerImpl
  implements IEnterpriseComputationResultPostProcessorChainHandler
{
  private static readonly CHAIN_NAME = "DefaultEnterpriseComputationResultPostProcessorChain";
  private static readonly CHAIN_VERSION = "1.0.0-POST-PROCESSOR-CHAIN";
  private static readonly CHAIN_DESCRIPTOR = "STANDARD_POST_PROCESSING_CHAIN_OF_RESPONSIBILITY";
  private readonly chainOrchestrator: ChainOfResponsibilityComputationResultPostProcessorImpl;

  constructor(chainOrchestrator: ChainOfResponsibilityComputationResultPostProcessorImpl) {
    this.chainOrchestrator = chainOrchestrator;
  }

  getChainName(): string { return DefaultEnterpriseComputationResultPostProcessorChainHandlerImpl.CHAIN_NAME; }
  getChainVersion(): string { return DefaultEnterpriseComputationResultPostProcessorChainHandlerImpl.CHAIN_VERSION; }

  executePostProcessingChain(value: number, computedResult: string, resolutionContext: string): string {
    return this.chainOrchestrator.postProcessResult(value, computedResult, resolutionContext);
  }

  registerProcessor(processor: IEnterpriseComputationResultPostProcessor, position: number): void {
    this.chainOrchestrator.registerProcessorAtPosition(processor, position);
  }

  getRegisteredProcessorCount(): number { return this.chainOrchestrator.getRegisteredProcessorCount(); }

  getRegisteredProcessorNames(): readonly string[] { return this.chainOrchestrator.getRegisteredProcessorNames(); }

  getChainDescriptor(): string { return DefaultEnterpriseComputationResultPostProcessorChainHandlerImpl.CHAIN_DESCRIPTOR; }
}

class DefaultEnterpriseComputationResultPostProcessorProviderImpl
  implements IEnterpriseComputationResultPostProcessorProvider
{
  private static readonly PROVIDER_NAME = "DefaultEnterpriseComputationResultPostProcessorProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-POST-PROCESSOR-PROVIDER";
  private readonly chainHandler: IEnterpriseComputationResultPostProcessorChainHandler;
  private readonly registry: IEnterpriseComputationResultPostProcessorRegistry;
  private providerInitialized: boolean = false;

  constructor(
    chainHandler: IEnterpriseComputationResultPostProcessorChainHandler,
    registry: IEnterpriseComputationResultPostProcessorRegistry,
  ) {
    this.chainHandler = chainHandler;
    this.registry = registry;
  }

  getProviderName(): string { return DefaultEnterpriseComputationResultPostProcessorProviderImpl.PROVIDER_NAME; }
  getProviderVersion(): string { return DefaultEnterpriseComputationResultPostProcessorProviderImpl.PROVIDER_VERSION; }

  processComputationResult(value: number, computedResult: string, resolutionContext: string): string {
    return this.chainHandler.executePostProcessingChain(value, computedResult, resolutionContext);
  }

  getActiveProcessorChainDescriptor(): string {
    const handler = this.chainHandler as DefaultEnterpriseComputationResultPostProcessorChainHandlerImpl | null;
    return handler && typeof handler.getChainDescriptor === "function"
      ? handler.getChainDescriptor()
      : "CHAIN_RESOLVED_DYNAMICALLY";
  }

  isProviderInitialized(): boolean { return this.providerInitialized; }

  markProviderInitialized(): void { this.providerInitialized = true; }

  getRegistry(): IEnterpriseComputationResultPostProcessorRegistry { return this.registry; }

  getChainHandler(): IEnterpriseComputationResultPostProcessorChainHandler { return this.chainHandler; }
}

class ComputationResultPostProcessorArchitectureFactoryBeanImpl
  implements IComputationResultPostProcessorArchitectureFactoryBean
{
  private static readonly FACTORY_BEAN_NAME = "ComputationResultPostProcessorArchitectureFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-POST-PROCESSOR-ARCHITECTURE-FACTORY";
  private static architectureInitialized = false;

  private static passThroughProcessor: PassThroughComputationResultPostProcessorImpl | null = null;
  private static validatingProcessor: ValidatingComputationResultPostProcessorImpl | null = null;
  private static chainOrchestrator: ChainOfResponsibilityComputationResultPostProcessorImpl | null = null;
  private static registry: DefaultEnterpriseComputationResultPostProcessorRegistryImpl | null = null;
  private static chainHandler: DefaultEnterpriseComputationResultPostProcessorChainHandlerImpl | null = null;
  private static provider: DefaultEnterpriseComputationResultPostProcessorProviderImpl | null = null;

  createProcessorProvider(): IEnterpriseComputationResultPostProcessorProvider {
    this.ensureArchitectureInitialized();
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.provider!;
  }

  createChainHandler(): IEnterpriseComputationResultPostProcessorChainHandler {
    this.ensureArchitectureInitialized();
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.chainHandler!;
  }

  createRegistry(): IEnterpriseComputationResultPostProcessorRegistry {
    this.ensureArchitectureInitialized();
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.registry!;
  }

  getFactoryBeanName(): string {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.FACTORY_BEAN_NAME;
  }

  getFactoryBeanVersion(): string {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.FACTORY_BEAN_VERSION;
  }

  isArchitectureInitialized(): boolean {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.architectureInitialized;
  }

  static initializeArchitecture(): void {
    if (ComputationResultPostProcessorArchitectureFactoryBeanImpl.architectureInitialized) return;

    ComputationResultPostProcessorArchitectureFactoryBeanImpl.passThroughProcessor =
      new PassThroughComputationResultPostProcessorImpl();
    ComputationResultPostProcessorArchitectureFactoryBeanImpl.validatingProcessor =
      new ValidatingComputationResultPostProcessorImpl();
    ComputationResultPostProcessorArchitectureFactoryBeanImpl.chainOrchestrator =
      new ChainOfResponsibilityComputationResultPostProcessorImpl();
    ComputationResultPostProcessorArchitectureFactoryBeanImpl.registry =
      new DefaultEnterpriseComputationResultPostProcessorRegistryImpl();

    ComputationResultPostProcessorArchitectureFactoryBeanImpl.registry.registerProcessor(
      ComputationResultPostProcessorArchitectureFactoryBeanImpl.passThroughProcessor,
    );
    ComputationResultPostProcessorArchitectureFactoryBeanImpl.registry.registerProcessor(
      ComputationResultPostProcessorArchitectureFactoryBeanImpl.validatingProcessor,
    );

    const sortedProcessors =
      ComputationResultPostProcessorArchitectureFactoryBeanImpl.registry.getRegisteredProcessors();
    for (let i = 0; i < sortedProcessors.length; i++) {
      ComputationResultPostProcessorArchitectureFactoryBeanImpl.chainOrchestrator!
        .registerProcessorAtPosition(sortedProcessors[i]!, i);
    }

    ComputationResultPostProcessorArchitectureFactoryBeanImpl.chainHandler =
      new DefaultEnterpriseComputationResultPostProcessorChainHandlerImpl(
        ComputationResultPostProcessorArchitectureFactoryBeanImpl.chainOrchestrator,
      );

    ComputationResultPostProcessorArchitectureFactoryBeanImpl.provider =
      new DefaultEnterpriseComputationResultPostProcessorProviderImpl(
        ComputationResultPostProcessorArchitectureFactoryBeanImpl.chainHandler,
        ComputationResultPostProcessorArchitectureFactoryBeanImpl.registry,
      );
    ComputationResultPostProcessorArchitectureFactoryBeanImpl.provider.markProviderInitialized();

    ComputationResultPostProcessorArchitectureFactoryBeanImpl.architectureInitialized = true;
  }

  static isInitialized(): boolean {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.architectureInitialized;
  }

  static getProvider(): IEnterpriseComputationResultPostProcessorProvider | null {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.provider;
  }

  static getRegistry(): IEnterpriseComputationResultPostProcessorRegistry | null {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.registry;
  }

  static getChainHandler(): IEnterpriseComputationResultPostProcessorChainHandler | null {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.chainHandler;
  }

  private ensureArchitectureInitialized(): void {
    if (!ComputationResultPostProcessorArchitectureFactoryBeanImpl.architectureInitialized) {
      ComputationResultPostProcessorArchitectureFactoryBeanImpl.initializeArchitecture();
    }
  }
}

export class ComputationResultPostProcessorArchitectureFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationResultPostProcessorArchitectureFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-POST-PROCESSOR-ARCHITECTURE-FACTORY-BEAN-FACTORY";

  static initializeArchitecture(): IEnterpriseComputationResultPostProcessorProvider {
    ComputationResultPostProcessorArchitectureFactoryBeanImpl.initializeArchitecture();
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.getProvider()!;
  }

  static createFactoryBean(): IComputationResultPostProcessorArchitectureFactoryBean {
    return new ComputationResultPostProcessorArchitectureFactoryBeanImpl();
  }

  static getProvider(): IEnterpriseComputationResultPostProcessorProvider | null {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.getProvider();
  }

  static getRegistry(): IEnterpriseComputationResultPostProcessorRegistry | null {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.getRegistry();
  }

  static getChainHandler(): IEnterpriseComputationResultPostProcessorChainHandler | null {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.getChainHandler();
  }

  static isArchitectureInitialized(): boolean {
    return ComputationResultPostProcessorArchitectureFactoryBeanImpl.isInitialized();
  }

  static getFactoryBeanName(): string {
    return ComputationResultPostProcessorArchitectureFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationResultPostProcessorArchitectureFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

export interface IEnterpriseComputationResultPostProcessor {
  getProcessorName(): string;
  getProcessorVersion(): string;
  getProcessorPriority(): number;
  postProcessResult(value: number, computedResult: string, resolutionContext: string): string;
  isProcessorActive(): boolean;
  getProcessorDescriptor(): string;
}

export interface IEnterpriseComputationResultPostProcessorVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  visitPostProcessor(processor: IEnterpriseComputationResultPostProcessor, value: number, result: string): string;
}

export interface IEnterpriseComputationResultPostProcessorChainHandler {
  getChainName(): string;
  getChainVersion(): string;
  executePostProcessingChain(value: number, computedResult: string, resolutionContext: string): string;
  registerProcessor(processor: IEnterpriseComputationResultPostProcessor, position: number): void;
  getRegisteredProcessorCount(): number;
  getRegisteredProcessorNames(): readonly string[];
}

export interface IEnterpriseComputationResultPostProcessorRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerProcessor(processor: IEnterpriseComputationResultPostProcessor): void;
  unregisterProcessor(processorName: string): boolean;
  getRegisteredProcessors(): readonly IEnterpriseComputationResultPostProcessor[];
  getProcessorCount(): number;
  getProcessorByName(name: string): IEnterpriseComputationResultPostProcessor | null;
}

export interface IEnterpriseComputationResultPostProcessorProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  processComputationResult(value: number, computedResult: string, resolutionContext: string): string;
  getActiveProcessorChainDescriptor(): string;
  isProviderInitialized(): boolean;
}

export interface IPostProcessorAwareResolutionFacadeDecorator {
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getWrappedFacadeName(): string;
  getPostProcessorProviderName(): string;
  isDecoratorEnabled(): boolean;
}

export interface IComputationResultPostProcessorArchitectureFactoryBean {
  createProcessorProvider(): IEnterpriseComputationResultPostProcessorProvider;
  createChainHandler(): IEnterpriseComputationResultPostProcessorChainHandler;
  createRegistry(): IEnterpriseComputationResultPostProcessorRegistry;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  isArchitectureInitialized(): boolean;
}

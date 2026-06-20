import type { IFizzBuzzComputationPipelineProduct } from "./IFizzBuzzComputationPipelineBuilder.js";

export interface IFizzBuzzComputationPipelineProductFactoryBean {
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  createProduct(
    resolutionFacade: { resolveValue: (value: number) => string },
    rangeIterator: { getIteratorName(): string; getIteratorVersion(): string } | null,
    governanceEnforcer: ((value: number, inner: (v: number) => string) => string) | null,
    mediationOrchestrator: {
      orchestrateDirectiveResolution: (value: number, inner: (v: number) => string) => string;
      orchestrateRangeDirectiveResolution: (start: number, end: number, inner: (v: number) => string) => readonly string[];
    } | null,
    configurationProfile: string,
    slaThresholdMs: number,
    cacheEnabled: boolean,
  ): IFizzBuzzComputationPipelineProduct;
  destroyProduct(product: IFizzBuzzComputationPipelineProduct): void;
  isSingleton(): boolean;
}

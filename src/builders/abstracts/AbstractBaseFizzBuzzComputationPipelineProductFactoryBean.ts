import type { IFizzBuzzComputationPipelineProductFactoryBean } from "../contracts/IFizzBuzzComputationPipelineProductFactoryBean.js";
import type { IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";

export abstract class AbstractBaseFizzBuzzComputationPipelineProductFactoryBean
  implements IFizzBuzzComputationPipelineProductFactoryBean
{
  protected abstract readonly factoryBeanName: string;
  protected abstract readonly factoryBeanVersion: string;
  protected abstract readonly factoryBeanSingleton: boolean;
  protected singletonProduct: IFizzBuzzComputationPipelineProduct | null = null;

  getFactoryBeanName(): string {
    return this.factoryBeanName;
  }

  getFactoryBeanVersion(): string {
    return this.factoryBeanVersion;
  }

  isSingleton(): boolean {
    return this.factoryBeanSingleton;
  }

  abstract createProduct(
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

  destroyProduct(product: IFizzBuzzComputationPipelineProduct): void {
    if (this.factoryBeanSingleton && this.singletonProduct === product) {
      this.singletonProduct = null;
    }
  }
}

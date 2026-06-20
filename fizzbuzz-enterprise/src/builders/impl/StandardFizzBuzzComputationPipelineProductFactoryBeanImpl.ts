import { AbstractBaseFizzBuzzComputationPipelineProductFactoryBean } from "../abstracts/AbstractBaseFizzBuzzComputationPipelineProductFactoryBean.js";
import type { IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";
import { StandardFizzBuzzComputationPipelineProductImpl } from "./StandardFizzBuzzComputationPipelineProductImpl.js";

const FACTORY_BEAN_NAME = "StandardFizzBuzzComputationPipelineProductFactoryBean";
const FACTORY_BEAN_VERSION = "1.0.0-PRODUCT-FACTORY-BEAN";
const FACTORY_BEAN_SINGLETON = false;

export class StandardFizzBuzzComputationPipelineProductFactoryBeanImpl
  extends AbstractBaseFizzBuzzComputationPipelineProductFactoryBean
{
  protected readonly factoryBeanName: string = FACTORY_BEAN_NAME;
  protected readonly factoryBeanVersion: string = FACTORY_BEAN_VERSION;
  protected readonly factoryBeanSingleton: boolean = FACTORY_BEAN_SINGLETON;

  override createProduct(
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
  ): IFizzBuzzComputationPipelineProduct {
    if (this.factoryBeanSingleton && this.singletonProduct !== null) {
      return this.singletonProduct;
    }
    const product = new StandardFizzBuzzComputationPipelineProductImpl(
      resolutionFacade,
      rangeIterator as any,
      governanceEnforcer,
      mediationOrchestrator,
      configurationProfile,
      slaThresholdMs,
      cacheEnabled,
    );
    if (this.factoryBeanSingleton) {
      this.singletonProduct = product;
    }
    return product;
  }
}

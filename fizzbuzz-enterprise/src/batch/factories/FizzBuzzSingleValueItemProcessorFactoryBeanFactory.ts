import { FizzBuzzSingleValueChunkOrientedItemProcessorImpl } from "../impl/FizzBuzzSingleValueChunkOrientedItemProcessorImpl.js";

export class FizzBuzzSingleValueItemProcessorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzSingleValueItemProcessorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PROCESSOR-FACTORY-BEAN";

  private static processorInstances: Map<string, FizzBuzzSingleValueChunkOrientedItemProcessorImpl> = new Map();

  static createProcessor(resolver: (value: number) => string): FizzBuzzSingleValueChunkOrientedItemProcessorImpl {
    const cacheKey = `${FizzBuzzSingleValueItemProcessorFactoryBeanFactory.FACTORY_BEAN_NAME}:resolver`;
    if (!FizzBuzzSingleValueItemProcessorFactoryBeanFactory.processorInstances.has(cacheKey)) {
      const processor = new FizzBuzzSingleValueChunkOrientedItemProcessorImpl(resolver);
      FizzBuzzSingleValueItemProcessorFactoryBeanFactory.processorInstances.set(cacheKey, processor);
    }
    return FizzBuzzSingleValueItemProcessorFactoryBeanFactory.processorInstances.get(cacheKey)!;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzSingleValueItemProcessorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzSingleValueItemProcessorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactory(): void {
    FizzBuzzSingleValueItemProcessorFactoryBeanFactory.processorInstances.clear();
  }
}

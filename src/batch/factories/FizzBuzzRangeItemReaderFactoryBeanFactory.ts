import { FizzBuzzRangeChunkOrientedItemReaderImpl } from "../impl/FizzBuzzRangeChunkOrientedItemReaderImpl.js";

export class FizzBuzzRangeItemReaderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzRangeItemReaderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-READER-FACTORY-BEAN";

  private static readerInstances: Map<string, FizzBuzzRangeChunkOrientedItemReaderImpl> = new Map();

  static createReader(rangeStart: number, rangeEnd: number): FizzBuzzRangeChunkOrientedItemReaderImpl {
    const cacheKey = `${FizzBuzzRangeItemReaderFactoryBeanFactory.FACTORY_BEAN_NAME}:${rangeStart}-${rangeEnd}`;
    if (!FizzBuzzRangeItemReaderFactoryBeanFactory.readerInstances.has(cacheKey)) {
      const reader = new FizzBuzzRangeChunkOrientedItemReaderImpl(rangeStart, rangeEnd);
      FizzBuzzRangeItemReaderFactoryBeanFactory.readerInstances.set(cacheKey, reader);
    }
    return FizzBuzzRangeItemReaderFactoryBeanFactory.readerInstances.get(cacheKey)!;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzRangeItemReaderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzRangeItemReaderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactory(): void {
    FizzBuzzRangeItemReaderFactoryBeanFactory.readerInstances.clear();
  }
}

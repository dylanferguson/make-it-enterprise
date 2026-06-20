import { FizzBuzzResultChunkOrientedItemCollectorWriterImpl } from "../impl/FizzBuzzResultChunkOrientedItemCollectorWriterImpl.js";

export class FizzBuzzResultItemWriterFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzResultItemWriterFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-WRITER-FACTORY-BEAN";

  private static writerInstance: FizzBuzzResultChunkOrientedItemCollectorWriterImpl | null = null;

  static createWriter(): FizzBuzzResultChunkOrientedItemCollectorWriterImpl {
    if (FizzBuzzResultItemWriterFactoryBeanFactory.writerInstance === null) {
      FizzBuzzResultItemWriterFactoryBeanFactory.writerInstance =
        new FizzBuzzResultChunkOrientedItemCollectorWriterImpl();
    }
    return FizzBuzzResultItemWriterFactoryBeanFactory.writerInstance;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzResultItemWriterFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzResultItemWriterFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactory(): void {
    FizzBuzzResultItemWriterFactoryBeanFactory.writerInstance = null;
  }
}

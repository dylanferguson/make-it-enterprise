import type { IBatchChunkOrientedJob } from "../contracts/index.js";
import type { IBatchChunkOrientedItemReader } from "../contracts/index.js";
import type { IBatchChunkOrientedItemProcessor } from "../contracts/index.js";
import type { IBatchChunkOrientedItemWriter } from "../contracts/index.js";
import type { IBatchJobConfiguration } from "../contracts/index.js";
import type { IBatchJobExecutionMonitor } from "../contracts/index.js";
import { StandardFizzBuzzBatchChunkOrientedJobImpl } from "../impl/StandardFizzBuzzBatchChunkOrientedJobImpl.js";

export class FizzBuzzBatchChunkOrientedJobFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzBatchChunkOrientedJobFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-JOB-FACTORY-BEAN";

  private static jobInstance: IBatchChunkOrientedJob<number, string> | null = null;

  static createJob(
    reader: IBatchChunkOrientedItemReader<number>,
    processor: IBatchChunkOrientedItemProcessor<number, string>,
    writer: IBatchChunkOrientedItemWriter<string>,
    configuration: IBatchJobConfiguration,
    executionMonitor: IBatchJobExecutionMonitor,
  ): IBatchChunkOrientedJob<number, string> {
    if (FizzBuzzBatchChunkOrientedJobFactoryBeanFactory.jobInstance === null) {
      FizzBuzzBatchChunkOrientedJobFactoryBeanFactory.jobInstance =
        new StandardFizzBuzzBatchChunkOrientedJobImpl(
          reader,
          processor,
          writer,
          configuration,
          executionMonitor,
        );
    }
    return FizzBuzzBatchChunkOrientedJobFactoryBeanFactory.jobInstance;
  }

  static getJob(): IBatchChunkOrientedJob<number, string> | null {
    return FizzBuzzBatchChunkOrientedJobFactoryBeanFactory.jobInstance;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzBatchChunkOrientedJobFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzBatchChunkOrientedJobFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactory(): void {
    FizzBuzzBatchChunkOrientedJobFactoryBeanFactory.jobInstance = null;
  }
}

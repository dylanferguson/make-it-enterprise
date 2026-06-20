import { AbstractBaseBatchChunkOrientedItemProcessor } from "../abstracts/AbstractBaseBatchChunkOrientedItemProcessor.js";

export class FizzBuzzSingleValueChunkOrientedItemProcessorImpl
  extends AbstractBaseBatchChunkOrientedItemProcessor<number, string>
{
  private static readonly PROCESSOR_NAME = "FizzBuzzSingleValueChunkOrientedItemProcessor";
  private static readonly PROCESSOR_VERSION = "1.0.0-CHUNK-ORIENTED-VALUE-PROCESSOR";

  private readonly singleValueResolver: (value: number) => string;

  constructor(singleValueResolver: (value: number) => string) {
    super(
      FizzBuzzSingleValueChunkOrientedItemProcessorImpl.PROCESSOR_NAME,
      FizzBuzzSingleValueChunkOrientedItemProcessorImpl.PROCESSOR_VERSION,
    );
    this.singleValueResolver = singleValueResolver;
  }

  override processItem(item: number): string {
    const result = this.singleValueResolver(item);
    this.incrementSuccessCount();
    return result;
  }
}

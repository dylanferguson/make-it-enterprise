import { AbstractBaseBatchJobConfiguration } from "../abstracts/AbstractBaseBatchJobConfiguration.js";

export class DefaultFizzBuzzBatchJobConfigurationImpl extends AbstractBaseBatchJobConfiguration {
  private static readonly CONFIGURATION_NAME = "DefaultFizzBuzzBatchJobConfiguration";
  private static readonly CONFIGURATION_VERSION = "1.0.0-DEFAULT-BATCH-CONFIG";
  private static readonly DEFAULT_CHUNK_SIZE = 10;
  private static readonly DEFAULT_SKIP_LIMIT = 0;
  private static readonly DEFAULT_RETRY_ENABLED = false;
  private static readonly DEFAULT_MAX_RETRY_ATTEMPTS = 0;
  private static readonly DEFAULT_JOB_INSTANCE_NAME = "FizzBuzzRangeBatchJob";

  constructor() {
    super(
      DefaultFizzBuzzBatchJobConfigurationImpl.CONFIGURATION_NAME,
      DefaultFizzBuzzBatchJobConfigurationImpl.CONFIGURATION_VERSION,
    );
  }

  override getChunkSize(): number {
    return DefaultFizzBuzzBatchJobConfigurationImpl.DEFAULT_CHUNK_SIZE;
  }

  override getSkipLimit(): number {
    return DefaultFizzBuzzBatchJobConfigurationImpl.DEFAULT_SKIP_LIMIT;
  }

  override isRetryEnabled(): boolean {
    return DefaultFizzBuzzBatchJobConfigurationImpl.DEFAULT_RETRY_ENABLED;
  }

  override getMaxRetryAttempts(): number {
    return DefaultFizzBuzzBatchJobConfigurationImpl.DEFAULT_MAX_RETRY_ATTEMPTS;
  }

  override getJobInstanceName(): string {
    return DefaultFizzBuzzBatchJobConfigurationImpl.DEFAULT_JOB_INSTANCE_NAME;
  }
}

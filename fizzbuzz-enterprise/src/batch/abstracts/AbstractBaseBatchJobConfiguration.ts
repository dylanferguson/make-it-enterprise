import type { IBatchJobConfiguration } from "../contracts/index.js";

export abstract class AbstractBaseBatchJobConfiguration
  implements IBatchJobConfiguration
{
  private readonly configurationName: string;
  private readonly configurationVersion: string;

  constructor(configurationName: string, configurationVersion: string) {
    this.configurationName = configurationName;
    this.configurationVersion = configurationVersion;
  }

  abstract getChunkSize(): number;
  abstract getSkipLimit(): number;
  abstract isRetryEnabled(): boolean;
  abstract getMaxRetryAttempts(): number;
  abstract getJobInstanceName(): string;

  getConfigurationName(): string {
    return this.configurationName;
  }

  getConfigurationVersion(): string {
    return this.configurationVersion;
  }
}

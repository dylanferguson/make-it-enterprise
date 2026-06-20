import type { IEnterpriseTransactionTimeoutConfigurationProvider } from "../contracts/IEnterpriseTransactionTimeoutConfigurationProvider.js";

export abstract class AbstractBaseEnterpriseTransactionTimeoutConfigurationProvider
  implements IEnterpriseTransactionTimeoutConfigurationProvider
{
  protected static readonly MIN_TIMEOUT_SECONDS: number = 1;
  protected static readonly MAX_TIMEOUT_SECONDS: number = 300;
  protected static readonly DEFAULT_TIMEOUT_SECONDS: number = 30;

  abstract getDefaultTimeoutSeconds(): number;
  abstract getMaximumTimeoutSeconds(): number;
  abstract getMinimumTimeoutSeconds(): number;
  abstract isTimeoutConfigurable(): boolean;
  abstract getConfigurationProviderName(): string;
  abstract getConfigurationProviderVersion(): string;
  abstract resolveTimeoutSeconds(attributeType: string): number;

  protected enforceTimeoutBounds(timeoutSeconds: number): number {
    const min = this.getMinimumTimeoutSeconds();
    const max = this.getMaximumTimeoutSeconds();
    if (timeoutSeconds < min) return min;
    if (timeoutSeconds > max) return max;
    return timeoutSeconds;
  }
}

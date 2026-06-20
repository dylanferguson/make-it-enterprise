import { AbstractBaseEnterpriseTransactionTimeoutConfigurationProvider } from "../abstracts/AbstractBaseEnterpriseTransactionTimeoutConfigurationProvider.js";

export class TransactionConfigurableTimeoutConfigurationProviderImpl
  extends AbstractBaseEnterpriseTransactionTimeoutConfigurationProvider
{
  private static readonly PROVIDER_NAME = "TransactionConfigurableTimeoutConfigurationProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-TIMEOUT-PROVIDER";

  private readonly defaultTimeoutSeconds: number = 30;
  private readonly maximumTimeoutSeconds: number = 300;
  private readonly minimumTimeoutSeconds: number = 1;
  private readonly timeoutConfigurable: boolean = true;

  override getDefaultTimeoutSeconds(): number {
    return this.defaultTimeoutSeconds;
  }

  override getMaximumTimeoutSeconds(): number {
    return this.maximumTimeoutSeconds;
  }

  override getMinimumTimeoutSeconds(): number {
    return this.minimumTimeoutSeconds;
  }

  override isTimeoutConfigurable(): boolean {
    return this.timeoutConfigurable;
  }

  override getConfigurationProviderName(): string {
    return TransactionConfigurableTimeoutConfigurationProviderImpl.PROVIDER_NAME;
  }

  override getConfigurationProviderVersion(): string {
    return TransactionConfigurableTimeoutConfigurationProviderImpl.PROVIDER_VERSION;
  }

  override resolveTimeoutSeconds(attributeType: string): number {
    let timeout = this.defaultTimeoutSeconds;
    switch (attributeType) {
      case "REQUIRES_NEW":
        timeout = 60;
        break;
      case "MANDATORY":
        timeout = 15;
        break;
      case "NEVER":
        timeout = 5;
        break;
      case "REQUIRED":
      default:
        timeout = this.defaultTimeoutSeconds;
        break;
    }
    return this.enforceTimeoutBounds(timeout);
  }
}

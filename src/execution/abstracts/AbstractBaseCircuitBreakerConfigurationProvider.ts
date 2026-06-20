import type { ICircuitBreakerConfigurationProvider } from "../contracts/index.js";

export abstract class AbstractBaseCircuitBreakerConfigurationProvider
  implements ICircuitBreakerConfigurationProvider
{
  private static readonly CONFIG_FRAMEWORK_VERSION = "1.0.0-CIRCUIT-BREAKER-CONFIG-FRAMEWORK";

  abstract getFailureThreshold(): number;
  abstract getSuccessThreshold(): number;
  abstract getTimeoutMs(): number;
  abstract getConfigurationProviderName(): string;
  abstract getConfigurationProviderVersion(): string;

  protected getConfigFrameworkVersion(): string {
    return AbstractBaseCircuitBreakerConfigurationProvider.CONFIG_FRAMEWORK_VERSION;
  }
}

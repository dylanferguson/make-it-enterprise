import { AbstractBaseCircuitBreakerConfigurationProvider } from "../../abstracts/AbstractBaseCircuitBreakerConfigurationProvider.js";

export class DefaultCircuitBreakerConfigurationProviderImpl
  extends AbstractBaseCircuitBreakerConfigurationProvider
{
  private static readonly PROVIDER_NAME = "DefaultCircuitBreakerConfigurationProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-DEFAULT-CIRCUIT-BREAKER-CONFIG";

  private static readonly DEFAULT_FAILURE_THRESHOLD = 5;
  private static readonly DEFAULT_SUCCESS_THRESHOLD = 2;
  private static readonly DEFAULT_TIMEOUT_MS = 10000;

  private readonly failureThreshold: number;
  private readonly successThreshold: number;
  private readonly timeoutMs: number;

  constructor(
    failureThreshold: number = DefaultCircuitBreakerConfigurationProviderImpl.DEFAULT_FAILURE_THRESHOLD,
    successThreshold: number = DefaultCircuitBreakerConfigurationProviderImpl.DEFAULT_SUCCESS_THRESHOLD,
    timeoutMs: number = DefaultCircuitBreakerConfigurationProviderImpl.DEFAULT_TIMEOUT_MS,
  ) {
    super();
    this.failureThreshold = failureThreshold;
    this.successThreshold = successThreshold;
    this.timeoutMs = timeoutMs;
  }

  override getFailureThreshold(): number {
    return this.failureThreshold;
  }

  override getSuccessThreshold(): number {
    return this.successThreshold;
  }

  override getTimeoutMs(): number {
    return this.timeoutMs;
  }

  override getConfigurationProviderName(): string {
    return DefaultCircuitBreakerConfigurationProviderImpl.PROVIDER_NAME;
  }

  override getConfigurationProviderVersion(): string {
    return DefaultCircuitBreakerConfigurationProviderImpl.PROVIDER_VERSION;
  }
}

import type { ICircuitBreakerStateStore, ICircuitBreakerState } from "../contracts/index.js";

export abstract class AbstractBaseCircuitBreakerStateStore
  implements ICircuitBreakerStateStore
{
  private static readonly STORE_FRAMEWORK_VERSION = "1.0.0-CIRCUIT-BREAKER-STORE-FRAMEWORK";

  abstract getState(): ICircuitBreakerState;
  abstract transitionToClosed(): void;
  abstract transitionToOpen(): void;
  abstract transitionToHalfOpen(): void;
  abstract incrementFailureCount(): void;
  abstract incrementSuccessCount(): void;
  abstract getFailureCount(): number;
  abstract getSuccessCount(): number;
  abstract getLastFailureTimestampMs(): number;
  abstract getLastSuccessTimestampMs(): number;
  abstract getStoreName(): string;
  abstract getStoreVersion(): string;
  abstract reset(): void;

  protected getStoreFrameworkVersion(): string {
    return AbstractBaseCircuitBreakerStateStore.STORE_FRAMEWORK_VERSION;
  }
}

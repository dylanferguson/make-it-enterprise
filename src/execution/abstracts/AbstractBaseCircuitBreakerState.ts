import type { ICircuitBreakerState } from "../contracts/index.js";

export abstract class AbstractBaseCircuitBreakerState implements ICircuitBreakerState {
  private static readonly STATE_FRAMEWORK_VERSION = "1.0.0-CIRCUIT-BREAKER-STATE-FRAMEWORK";

  abstract getStateName(): string;
  abstract isClosed(): boolean;
  abstract isOpen(): boolean;
  abstract isHalfOpen(): boolean;

  protected getStateFrameworkVersion(): string {
    return AbstractBaseCircuitBreakerState.STATE_FRAMEWORK_VERSION;
  }
}

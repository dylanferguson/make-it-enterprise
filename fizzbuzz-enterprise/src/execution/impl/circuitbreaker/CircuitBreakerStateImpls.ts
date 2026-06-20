import { AbstractBaseCircuitBreakerState } from "../../abstracts/AbstractBaseCircuitBreakerState.js";

export class ClosedCircuitBreakerStateImpl extends AbstractBaseCircuitBreakerState {
  private static readonly STATE_NAME = "CLOSED";

  override getStateName(): string {
    return ClosedCircuitBreakerStateImpl.STATE_NAME;
  }

  override isClosed(): boolean {
    return true;
  }

  override isOpen(): boolean {
    return false;
  }

  override isHalfOpen(): boolean {
    return false;
  }
}

export class OpenCircuitBreakerStateImpl extends AbstractBaseCircuitBreakerState {
  private static readonly STATE_NAME = "OPEN";

  override getStateName(): string {
    return OpenCircuitBreakerStateImpl.STATE_NAME;
  }

  override isClosed(): boolean {
    return false;
  }

  override isOpen(): boolean {
    return true;
  }

  override isHalfOpen(): boolean {
    return false;
  }
}

export class HalfOpenCircuitBreakerStateImpl extends AbstractBaseCircuitBreakerState {
  private static readonly STATE_NAME = "HALF_OPEN";

  override getStateName(): string {
    return HalfOpenCircuitBreakerStateImpl.STATE_NAME;
  }

  override isClosed(): boolean {
    return false;
  }

  override isOpen(): boolean {
    return false;
  }

  override isHalfOpen(): boolean {
    return true;
  }
}

import { AbstractBaseCircuitBreakerStateStore } from "../../abstracts/AbstractBaseCircuitBreakerStateStore.js";
import type { ICircuitBreakerState } from "../../contracts/index.js";
import {
  ClosedCircuitBreakerStateImpl,
  OpenCircuitBreakerStateImpl,
  HalfOpenCircuitBreakerStateImpl,
} from "./CircuitBreakerStateImpls.js";

export class InMemoryCircuitBreakerStateStoreImpl
  extends AbstractBaseCircuitBreakerStateStore
{
  private static readonly STORE_NAME = "InMemoryCircuitBreakerStateStore";
  private static readonly STORE_VERSION = "1.0.0-IN-MEMORY-CIRCUIT-BREAKER-STORE";

  private currentState: ICircuitBreakerState;
  private failureCount: number = 0;
  private successCount: number = 0;
  private lastFailureTimestampMs: number = 0;
  private lastSuccessTimestampMs: number = 0;

  private readonly closedState = new ClosedCircuitBreakerStateImpl();
  private readonly openState = new OpenCircuitBreakerStateImpl();
  private readonly halfOpenState = new HalfOpenCircuitBreakerStateImpl();

  constructor() {
    super();
    this.currentState = this.closedState;
  }

  override getState(): ICircuitBreakerState {
    return this.currentState;
  }

  override transitionToClosed(): void {
    this.currentState = this.closedState;
    this.failureCount = 0;
    this.successCount = 0;
  }

  override transitionToOpen(): void {
    this.currentState = this.openState;
    this.lastFailureTimestampMs = Date.now();
  }

  override transitionToHalfOpen(): void {
    this.currentState = this.halfOpenState;
  }

  override incrementFailureCount(): void {
    this.failureCount++;
    this.lastFailureTimestampMs = Date.now();
  }

  override incrementSuccessCount(): void {
    this.successCount++;
    this.lastSuccessTimestampMs = Date.now();
  }

  override getFailureCount(): number {
    return this.failureCount;
  }

  override getSuccessCount(): number {
    return this.successCount;
  }

  override getLastFailureTimestampMs(): number {
    return this.lastFailureTimestampMs;
  }

  override getLastSuccessTimestampMs(): number {
    return this.lastSuccessTimestampMs;
  }

  override getStoreName(): string {
    return InMemoryCircuitBreakerStateStoreImpl.STORE_NAME;
  }

  override getStoreVersion(): string {
    return InMemoryCircuitBreakerStateStoreImpl.STORE_VERSION;
  }

  override reset(): void {
    this.currentState = this.closedState;
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTimestampMs = 0;
    this.lastSuccessTimestampMs = 0;
  }
}

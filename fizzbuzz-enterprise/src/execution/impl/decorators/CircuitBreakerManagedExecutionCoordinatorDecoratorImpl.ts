import { AbstractBaseCircuitBreakerAwareExecutionCoordinatorDecorator } from "../../abstracts/AbstractBaseCircuitBreakerAwareExecutionCoordinatorDecorator.js";
import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../../contracts/index.js";
import type { ICircuitBreakerConfigurationProvider } from "../../contracts/index.js";
import type { ICircuitBreakerStateStore } from "../../contracts/index.js";
import type { ICircuitBreakerStateSnapshot } from "../../contracts/index.js";

export class CircuitBreakerManagedExecutionCoordinatorDecoratorImpl
  extends AbstractBaseCircuitBreakerAwareExecutionCoordinatorDecorator
{
  private static readonly DECORATOR_NAME = "CircuitBreakerManagedExecutionCoordinatorDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-CIRCUIT-BREAKER-MANAGED-DECORATOR";

  private readonly circuitBreakerStateStore: ICircuitBreakerStateStore;

  constructor(
    wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
    circuitBreakerConfig: ICircuitBreakerConfigurationProvider,
    circuitBreakerStateStore: ICircuitBreakerStateStore,
  ) {
    super(wrappedCoordinator, circuitBreakerConfig);
    this.circuitBreakerStateStore = circuitBreakerStateStore;
  }

  override coordinateSingleValueExecution(value: number): string {
    const currentState = this.circuitBreakerStateStore.getState();
    if (currentState.isOpen()) {
      const timeoutMs = this.circuitBreakerConfig.getTimeoutMs();
      if (Date.now() - this.circuitBreakerStateStore.getLastFailureTimestampMs() > timeoutMs) {
        this.circuitBreakerStateStore.transitionToHalfOpen();
      } else {
        throw new Error(
          `[${CircuitBreakerManagedExecutionCoordinatorDecoratorImpl.DECORATOR_NAME}] ` +
          `Circuit breaker is OPEN for value ${value}. ` +
          `Failure count: ${this.circuitBreakerStateStore.getFailureCount()}, ` +
          `timeout: ${timeoutMs}ms`,
        );
      }
    }
    try {
      const result = this.wrappedCoordinator.coordinateSingleValueExecution(value);
      if (currentState.isHalfOpen()) {
        this.circuitBreakerStateStore.incrementSuccessCount();
        if (this.circuitBreakerStateStore.getSuccessCount() >= this.circuitBreakerConfig.getSuccessThreshold()) {
          this.circuitBreakerStateStore.transitionToClosed();
        }
      }
      this.circuitBreakerStateStore.incrementSuccessCount();
      return result;
    } catch (error) {
      this.circuitBreakerStateStore.incrementFailureCount();
      if (this.circuitBreakerStateStore.getFailureCount() >= this.circuitBreakerConfig.getFailureThreshold()) {
        this.circuitBreakerStateStore.transitionToOpen();
      }
      throw error;
    }
  }

  override getCoordinatorName(): string {
    return `${CircuitBreakerManagedExecutionCoordinatorDecoratorImpl.DECORATOR_NAME}::${this.wrappedCoordinator.getCoordinatorName()}`;
  }

  override getCoordinatorVersion(): string {
    return CircuitBreakerManagedExecutionCoordinatorDecoratorImpl.DECORATOR_VERSION;
  }

  override getRegisteredExecutionStrategies(): readonly string[] {
    return this.wrappedCoordinator.getRegisteredExecutionStrategies();
  }

  override isCircuitBreakerEngaged(): boolean {
    return this.circuitBreakerStateStore.getState().isOpen();
  }

  override getCircuitBreakerStateSnapshot(): ICircuitBreakerStateSnapshot {
    const state = this.circuitBreakerStateStore.getState();
    return {
      stateName: state.getStateName(),
      isClosed: state.isClosed(),
      isOpen: state.isOpen(),
      isHalfOpen: state.isHalfOpen(),
      failureCount: this.circuitBreakerStateStore.getFailureCount(),
      successCount: this.circuitBreakerStateStore.getSuccessCount(),
      lastFailureTimestampMs: this.circuitBreakerStateStore.getLastFailureTimestampMs(),
      lastSuccessTimestampMs: this.circuitBreakerStateStore.getLastSuccessTimestampMs(),
      failureThreshold: this.circuitBreakerConfig.getFailureThreshold(),
      successThreshold: this.circuitBreakerConfig.getSuccessThreshold(),
    };
  }
}

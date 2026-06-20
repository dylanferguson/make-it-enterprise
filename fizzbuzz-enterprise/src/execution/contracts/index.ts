export interface IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator {
  coordinateSingleValueExecution(value: number): string;
  getCoordinatorName(): string;
  getCoordinatorVersion(): string;
  getRegisteredExecutionStrategies(): readonly string[];
  getCircuitBreakerStateSnapshot(): ICircuitBreakerStateSnapshot;
}

export interface IModularArithmeticExecutionStrategy {
  getStrategyName(): string;
  getStrategyVersion(): string;
  getSupportedDivisor(): number;
  executeValueResolution(
    value: number,
    innerResolutionDelegate: (v: number) => string,
  ): string;
}

export interface IModularArithmeticExecutionStrategySelector {
  selectStrategy(value: number): IModularArithmeticExecutionStrategy;
  getSelectorName(): string;
  getSelectorVersion(): string;
  getRegisteredStrategies(): readonly string[];
}

export interface IModularArithmeticExecutionChainOfResponsibilityHandler {
  getHandlerName(): string;
  getHandlerVersion(): string;
  getHandlerPriority(): number;
  handle(value: number, next: (v: number) => string): string;
  setNext(handler: IModularArithmeticExecutionChainOfResponsibilityHandler): void;
}

export interface ICircuitBreakerState {
  getStateName(): string;
  isClosed(): boolean;
  isOpen(): boolean;
  isHalfOpen(): boolean;
}

export interface ICircuitBreakerStateStore {
  getState(): ICircuitBreakerState;
  transitionToClosed(): void;
  transitionToOpen(): void;
  transitionToHalfOpen(): void;
  incrementFailureCount(): void;
  incrementSuccessCount(): void;
  getFailureCount(): number;
  getSuccessCount(): number;
  getLastFailureTimestampMs(): number;
  getLastSuccessTimestampMs(): number;
  getStoreName(): string;
  getStoreVersion(): string;
  reset(): void;
}

export interface ICircuitBreakerConfigurationProvider {
  getFailureThreshold(): number;
  getSuccessThreshold(): number;
  getTimeoutMs(): number;
  getConfigurationProviderName(): string;
  getConfigurationProviderVersion(): string;
}

export interface ICircuitBreakerStateSnapshot {
  readonly stateName: string;
  readonly isClosed: boolean;
  readonly isOpen: boolean;
  readonly isHalfOpen: boolean;
  readonly failureCount: number;
  readonly successCount: number;
  readonly lastFailureTimestampMs: number;
  readonly lastSuccessTimestampMs: number;
  readonly failureThreshold: number;
  readonly successThreshold: number;
}

export interface IExecutionSlaMetricsCollector {
  recordExecutionDuration(durationMs: number): void;
  recordExecutionTimeout(): void;
  recordExecutionFailure(): void;
  recordExecutionSuccess(): void;
  getTotalExecutionCount(): number;
  getTotalFailureCount(): number;
  getTotalTimeoutCount(): number;
  getAverageExecutionDurationMs(): number;
  getMetricsCollectorName(): string;
  getMetricsCollectorVersion(): string;
  getSloThresholdMs(): number;
  isSloBreached(): boolean;
  resetMetrics(): void;
}

export interface IExecutionLifecycleContext {
  getLifecycleContextName(): string;
  getLifecycleContextVersion(): string;
  getCurrentPhaseName(): string;
  isInPhase(phaseName: string): boolean;
  transitionToPhase(phaseName: string): void;
  getExecutionSequenceId(): string;
  getAvailablePhaseNames(): readonly string[];
}

export interface IExecutionCoordinatorFactoryBean {
  createCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
}

export interface ICircuitBreakerAwareExecutionCoordinatorDecorator
  extends IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator {
  getWrappedCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator;
  getCircuitBreakerConfiguration(): ICircuitBreakerConfigurationProvider;
  isCircuitBreakerEngaged(): boolean;
}

export interface ILifecycleManagedExecutionCoordinatorDecorator
  extends IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator {
  getWrappedCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator;
  getLifecycleContext(): IExecutionLifecycleContext;
}

export interface ISlaMonitoringExecutionCoordinatorDecorator
  extends IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator {
  getWrappedCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator;
  getSlaMetricsCollector(): IExecutionSlaMetricsCollector;
}

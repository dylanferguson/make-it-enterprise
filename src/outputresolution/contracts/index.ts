export interface IFizzBuzzOutputStringResolutionStrategy {
  getName(): string;
  getVersion(): string;
  getPriority(): number;
  canResolve(value: number): boolean;
  resolve(value: number): string;
  getResolvedIdentifier(): string;
}

export interface IFizzBuzzOutputStringResolutionStrategyVisitor {
  getName(): string;
  getVisitorPriority(): number;
  visitStrategy(strategy: IFizzBuzzOutputStringResolutionStrategy, value: number): boolean;
  selectResolvedStrategy(
    strategies: readonly IFizzBuzzOutputStringResolutionStrategy[],
    value: number,
  ): IFizzBuzzOutputStringResolutionStrategy | null;
}

export interface IFizzBuzzOutputStringResolutionStrategyRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerStrategy(strategy: IFizzBuzzOutputStringResolutionStrategy): void;
  unregisterStrategy(strategyName: string): boolean;
  getRegisteredStrategies(): readonly IFizzBuzzOutputStringResolutionStrategy[];
  getStrategyByName(name: string): IFizzBuzzOutputStringResolutionStrategy | null;
  getStrategyCount(): number;
  clearRegistry(): void;
}

export interface IFizzBuzzOutputStringResolutionChainHandler {
  getChainName(): string;
  getChainVersion(): string;
  handleResolution(value: number): IFizzBuzzOutputStringResolutionResult;
  registerStrategyHandler(
    handler: IFizzBuzzOutputStringResolutionStrategy,
    position: number,
  ): void;
  setFallbackStrategy(strategy: IFizzBuzzOutputStringResolutionStrategy): void;
}

export interface IFizzBuzzOutputStringResolutionResult {
  getResolvedValue(): string;
  getResolvedStrategyName(): string;
  getResolvedStrategyVersion(): string;
  getResolvedStrategyIdentifier(): string;
  isResolved(): boolean;
}

export interface IFizzBuzzOutputStringResolutionStrategyProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  resolveOutputString(value: number): IFizzBuzzOutputStringResolutionResult;
  getRegisteredStrategyNames(): readonly string[];
  getActiveResolutionStrategyIdentifier(): string;
}

export interface IFizzBuzzOutputStringResolutionStrategyFactoryBean {
  createProvider(): IFizzBuzzOutputStringResolutionStrategyProvider;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  isSingleton(): boolean;
  destroyProvider(): void;
}

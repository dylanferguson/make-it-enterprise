export interface IFizzBuzzResolutionMediator {
  getMediatorName(): string;
  getMediatorVersion(): string;
  mediateSingleValueResolution(value: number): string;
  mediateRangeResolution(start: number, end: number): readonly string[];
  registerResolutionStrategy(strategyName: string, strategy: (value: number) => string): void;
  getRegisteredStrategyNames(): readonly string[];
  getMediationStrategyCount(): number;
}

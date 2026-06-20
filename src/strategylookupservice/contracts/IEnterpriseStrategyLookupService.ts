export interface IEnterpriseStrategyLookupService {
  resolveStrategyProvider(strategyName: string, version?: string): object;
  registerStrategyProvider(strategyName: string, provider: object, version: string): void;
  getRegisteredStrategyNames(): readonly string[];
  getLookupServiceName(): string;
  getLookupServiceVersion(): string;
  isStrategyRegistered(strategyName: string): boolean;
  getStrategyProviderCount(): number;
}

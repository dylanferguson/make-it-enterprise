export interface IEnterpriseOutputCompositeStrategyProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  resolveCompositeOutput(value: number): string;
  getCompositeSeparator(): string;
  isCompositeResolutionEnabled(): boolean;
}

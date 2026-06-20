export interface IEnterpriseModuloArithmeticConfigurationProvider {
  getDivisorConstants(): readonly number[];
  getDivisorCandidates(): readonly number[];
  getConfigurationProviderName(): string;
  getConfigurationProviderVersion(): string;
  isDivisorRegistered(divisor: number): boolean;
  getResolutionPriority(divisor: number): number;
  getConfigurationProfile(): string;
}

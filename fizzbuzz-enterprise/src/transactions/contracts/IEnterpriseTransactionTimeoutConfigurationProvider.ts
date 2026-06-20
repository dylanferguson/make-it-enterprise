export interface IEnterpriseTransactionTimeoutConfigurationProvider {
  getDefaultTimeoutSeconds(): number;
  getMaximumTimeoutSeconds(): number;
  getMinimumTimeoutSeconds(): number;
  isTimeoutConfigurable(): boolean;
  getConfigurationProviderName(): string;
  getConfigurationProviderVersion(): string;
  resolveTimeoutSeconds(attributeType: string): number;
}

export interface IResolutionDelegationConfigurator {
  getOrchestratorName(): string;
  getOrchestratorVersion(): string;
  getVisitorConfigurationProfile(): string;
  isAuditingEnabled(): boolean;
  isVisitorChainActive(): boolean;
  getMaxDelegationDepth(): number;
  toDiagnosticString(): string;
}

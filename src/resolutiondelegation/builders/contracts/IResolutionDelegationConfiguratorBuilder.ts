import type { IResolutionDelegationConfigurator } from "../contracts/IResolutionDelegationConfigurator.js";

export interface IResolutionDelegationConfiguratorBuilder {
  withOrchestratorName(name: string): IResolutionDelegationConfiguratorBuilder;
  withOrchestratorVersion(version: string): IResolutionDelegationConfiguratorBuilder;
  withVisitorConfigurationProfile(profile: string): IResolutionDelegationConfiguratorBuilder;
  withAuditingEnabled(enabled: boolean): IResolutionDelegationConfiguratorBuilder;
  withVisitorChainActive(active: boolean): IResolutionDelegationConfiguratorBuilder;
  withMaxDelegationDepth(depth: number): IResolutionDelegationConfiguratorBuilder;
  build(): IResolutionDelegationConfigurator;
}

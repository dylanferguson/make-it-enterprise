import type { IResolutionDelegationConfiguratorBuilder } from "../contracts/IResolutionDelegationConfiguratorBuilder.js";
import type { IResolutionDelegationConfigurator } from "../contracts/IResolutionDelegationConfigurator.js";
import { DefaultResolutionDelegationConfiguratorImpl } from "../impl/DefaultResolutionDelegationConfiguratorImpl.js";

export abstract class AbstractBaseResolutionDelegationConfiguratorBuilder
  implements IResolutionDelegationConfiguratorBuilder
{
  protected orchestratorName: string = "UnconfiguredDelegationOrchestrator";
  protected orchestratorVersion: string = "0.0.0-UNCONFIGURED";
  protected visitorConfigurationProfile: string = "STANDARD";
  protected auditingEnabled: boolean = true;
  protected visitorChainActive: boolean = true;
  protected maxDelegationDepth: number = 10;

  withOrchestratorName(name: string): IResolutionDelegationConfiguratorBuilder {
    this.orchestratorName = name;
    return this;
  }

  withOrchestratorVersion(version: string): IResolutionDelegationConfiguratorBuilder {
    this.orchestratorVersion = version;
    return this;
  }

  withVisitorConfigurationProfile(profile: string): IResolutionDelegationConfiguratorBuilder {
    this.visitorConfigurationProfile = profile;
    return this;
  }

  withAuditingEnabled(enabled: boolean): IResolutionDelegationConfiguratorBuilder {
    this.auditingEnabled = enabled;
    return this;
  }

  withVisitorChainActive(active: boolean): IResolutionDelegationConfiguratorBuilder {
    this.visitorChainActive = active;
    return this;
  }

  withMaxDelegationDepth(depth: number): IResolutionDelegationConfiguratorBuilder {
    this.maxDelegationDepth = depth;
    return this;
  }

  abstract build(): IResolutionDelegationConfigurator;
}

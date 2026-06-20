import type { IResolutionDelegationConfigurator } from "../contracts/IResolutionDelegationConfigurator.js";
import type { IResolutionDelegationConfiguratorBuilder } from "../contracts/IResolutionDelegationConfiguratorBuilder.js";
import { AbstractBaseResolutionDelegationConfiguratorBuilder } from "../abstracts/AbstractBaseResolutionDelegationConfiguratorBuilder.js";
import { DefaultResolutionDelegationConfiguratorImpl } from "../impl/DefaultResolutionDelegationConfiguratorImpl.js";

export class DefaultResolutionDelegationConfiguratorBuilderImpl
  extends AbstractBaseResolutionDelegationConfiguratorBuilder
{
  private static readonly BUILDER_NAME = "DefaultResolutionDelegationConfiguratorBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-DELEGATION-CONFIGURATOR-BUILDER";

  override build(): IResolutionDelegationConfigurator {
    return new DefaultResolutionDelegationConfiguratorImpl(
      this.orchestratorName,
      this.orchestratorVersion,
      this.visitorConfigurationProfile,
      this.auditingEnabled,
      this.visitorChainActive,
      this.maxDelegationDepth,
    );
  }

  getBuilderName(): string {
    return DefaultResolutionDelegationConfiguratorBuilderImpl.BUILDER_NAME;
  }

  getBuilderVersion(): string {
    return DefaultResolutionDelegationConfiguratorBuilderImpl.BUILDER_VERSION;
  }
}

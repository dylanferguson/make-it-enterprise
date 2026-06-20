import type { IResolutionDelegationConfigurator } from "../contracts/IResolutionDelegationConfigurator.js";

export class DefaultResolutionDelegationConfiguratorImpl
  implements IResolutionDelegationConfigurator
{
  private readonly name: string;
  private readonly version: string;
  private readonly profile: string;
  private readonly auditing: boolean;
  private readonly chainActive: boolean;
  private readonly delegationDepth: number;

  constructor(
    name: string,
    version: string,
    profile: string,
    auditing: boolean,
    chainActive: boolean,
    delegationDepth: number,
  ) {
    this.name = name;
    this.version = version;
    this.profile = profile;
    this.auditing = auditing;
    this.chainActive = chainActive;
    this.delegationDepth = delegationDepth;
  }

  getOrchestratorName(): string { return this.name; }
  getOrchestratorVersion(): string { return this.version; }
  getVisitorConfigurationProfile(): string { return this.profile; }
  isAuditingEnabled(): boolean { return this.auditing; }
  isVisitorChainActive(): boolean { return this.chainActive; }
  getMaxDelegationDepth(): number { return this.delegationDepth; }

  toDiagnosticString(): string {
    return `[${this.name} v${this.version}] profile=${this.profile} auditing=${this.auditing} chainActive=${this.chainActive} maxDepth=${this.delegationDepth}`;
  }
}

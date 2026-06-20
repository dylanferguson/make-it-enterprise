import type { IFizzBuzzComputationPipelineBuilder, IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";
import type { IFizzBuzzRangeIterator } from "../../iterators/contracts/IFizzBuzzRangeIterator.js";

export abstract class AbstractBaseFizzBuzzComputationPipelineBuilder implements IFizzBuzzComputationPipelineBuilder {
  protected readonly builderName: string;
  protected readonly builderVersion: string;
  protected rangeIterator: IFizzBuzzRangeIterator | null = null;
  protected governanceEnforcer: ((value: number, inner: (v: number) => string) => string) | null = null;
  protected mediationOrchestrator: {
    orchestrateDirectiveResolution: (value: number, inner: (v: number) => string) => string;
    orchestrateRangeDirectiveResolution: (start: number, end: number, inner: (v: number) => string) => readonly string[];
  } | null = null;
  protected resolutionFacade: { resolveValue: (value: number) => string } | null = null;
  protected configurationProfile: string = "UNSPECIFIED";
  protected slaThresholdMs: number = 100;
  protected cacheEnabled: boolean = true;

  constructor(builderName: string, builderVersion: string) {
    this.builderName = builderName;
    this.builderVersion = builderVersion;
  }

  abstract build(): IFizzBuzzComputationPipelineProduct;

  getBuilderName(): string {
    return this.builderName;
  }

  getBuilderVersion(): string {
    return this.builderVersion;
  }

  withRangeIterator(iterator: IFizzBuzzRangeIterator): IFizzBuzzComputationPipelineBuilder {
    this.rangeIterator = iterator;
    return this;
  }

  withGovernanceEnforcement(
    governanceEnforcer: (value: number, inner: (v: number) => string) => string,
  ): IFizzBuzzComputationPipelineBuilder {
    this.governanceEnforcer = governanceEnforcer;
    return this;
  }

  withMediationOrchestrator(
    orchestrator: {
      orchestrateDirectiveResolution: (value: number, inner: (v: number) => string) => string;
      orchestrateRangeDirectiveResolution: (start: number, end: number, inner: (v: number) => string) => readonly string[];
    },
  ): IFizzBuzzComputationPipelineBuilder {
    this.mediationOrchestrator = orchestrator;
    return this;
  }

  withResolutionFacade(facade: { resolveValue: (value: number) => string }): IFizzBuzzComputationPipelineBuilder {
    this.resolutionFacade = facade;
    return this;
  }

  withConfigurationProfile(profile: string): IFizzBuzzComputationPipelineBuilder {
    this.configurationProfile = profile;
    return this;
  }

  withSlaThreshold(thresholdMs: number): IFizzBuzzComputationPipelineBuilder {
    this.slaThresholdMs = thresholdMs;
    return this;
  }

  withCacheEnabled(enabled: boolean): IFizzBuzzComputationPipelineBuilder {
    this.cacheEnabled = enabled;
    return this;
  }

  protected validateBuilderState(): void {
    if (this.resolutionFacade === null) {
      throw new Error(`[${this.builderName}] Pipeline builder requires a resolution facade to be configured`);
    }
  }

  protected getBuilderDiagnostics(): Record<string, string> {
    return {
      builderName: this.builderName,
      builderVersion: this.builderVersion,
      configurationProfile: this.configurationProfile,
      slaThresholdMs: String(this.slaThresholdMs),
      cacheEnabled: String(this.cacheEnabled),
      hasRangeIterator: String(this.rangeIterator !== null),
      hasGovernanceEnforcer: String(this.governanceEnforcer !== null),
      hasMediationOrchestrator: String(this.mediationOrchestrator !== null),
      hasResolutionFacade: String(this.resolutionFacade !== null),
    };
  }
}

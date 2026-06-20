import type { IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";
import type { IFizzBuzzRangeIterator } from "../../iterators/contracts/IFizzBuzzRangeIterator.js";

export abstract class AbstractBaseFizzBuzzComputationPipelineProduct implements IFizzBuzzComputationPipelineProduct {
  protected readonly resolutionFacade: { resolveValue: (value: number) => string };
  protected readonly rangeIterator: IFizzBuzzRangeIterator | null;
  protected readonly governanceEnforcer: ((value: number, inner: (v: number) => string) => string) | null;
  protected readonly mediationOrchestrator: {
    orchestrateDirectiveResolution: (value: number, inner: (v: number) => string) => string;
    orchestrateRangeDirectiveResolution: (start: number, end: number, inner: (v: number) => string) => readonly string[];
  } | null;
  protected readonly configurationProfile: string;
  protected readonly slaThresholdMs: number;
  protected readonly cacheEnabled: boolean;
  protected readonly constructedAt: number;

  protected abstract readonly productName: string;
  protected abstract readonly productVersion: string;

  constructor(
    resolutionFacade: { resolveValue: (value: number) => string },
    rangeIterator: IFizzBuzzRangeIterator | null,
    governanceEnforcer: ((value: number, inner: (v: number) => string) => string) | null,
    mediationOrchestrator: {
      orchestrateDirectiveResolution: (value: number, inner: (v: number) => string) => string;
      orchestrateRangeDirectiveResolution: (start: number, end: number, inner: (v: number) => string) => readonly string[];
    } | null,
    configurationProfile: string,
    slaThresholdMs: number,
    cacheEnabled: boolean,
  ) {
    this.resolutionFacade = resolutionFacade;
    this.rangeIterator = rangeIterator;
    this.governanceEnforcer = governanceEnforcer;
    this.mediationOrchestrator = mediationOrchestrator;
    this.configurationProfile = configurationProfile;
    this.slaThresholdMs = slaThresholdMs;
    this.cacheEnabled = cacheEnabled;
    this.constructedAt = performance.now();
  }

  getProductName(): string {
    return this.productName;
  }

  getProductVersion(): string {
    return this.productVersion;
  }

  getPipelineConfigurationProfile(): string {
    return this.configurationProfile;
  }

  getUnderlyingIterator(): IFizzBuzzRangeIterator | null {
    return this.rangeIterator;
  }

  abstract resolveSingleValue(value: number): string;

  abstract resolveRange(start: number, end: number): readonly string[];

  getDiagnosticSummary(): Record<string, string> {
    return {
      productName: this.getProductName(),
      productVersion: this.getProductVersion(),
      configurationProfile: this.configurationProfile,
      slaThresholdMs: String(this.slaThresholdMs),
      cacheEnabled: String(this.cacheEnabled),
      constructedAt: String(this.constructedAt),
      hasRangeIterator: String(this.rangeIterator !== null),
      hasGovernanceEnforcer: String(this.governanceEnforcer !== null),
      hasMediationOrchestrator: String(this.mediationOrchestrator !== null),
      iteratorName: this.rangeIterator?.getIteratorName() ?? "N/A",
      iteratorVersion: this.rangeIterator?.getIteratorVersion() ?? "N/A",
    };
  }
}

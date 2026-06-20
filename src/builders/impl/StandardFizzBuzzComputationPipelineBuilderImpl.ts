import { AbstractBaseFizzBuzzComputationPipelineBuilder } from "../abstracts/AbstractBaseFizzBuzzComputationPipelineBuilder.js";
import type { IFizzBuzzComputationPipelineBuilder, IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";
import type { IFizzBuzzRangeIterator } from "../../iterators/contracts/IFizzBuzzRangeIterator.js";
import { StandardFizzBuzzRangeIteratorImpl } from "../../iterators/impl/StandardFizzBuzzRangeIteratorImpl.js";

export class StandardFizzBuzzComputationPipelineBuilderImpl extends AbstractBaseFizzBuzzComputationPipelineBuilder {
  private static readonly BUILDER_NAME = "StandardFizzBuzzComputationPipelineBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-BUILDER";

  constructor() {
    super(
      StandardFizzBuzzComputationPipelineBuilderImpl.BUILDER_NAME,
      StandardFizzBuzzComputationPipelineBuilderImpl.BUILDER_VERSION,
    );
  }

  override build(): IFizzBuzzComputationPipelineProduct {
    this.validateBuilderState();
    const product = new StandardFizzBuzzComputationPipelineProductImpl(
      this.resolutionFacade!,
      this.rangeIterator,
      this.governanceEnforcer,
      this.mediationOrchestrator,
      this.configurationProfile,
      this.slaThresholdMs,
      this.cacheEnabled,
    );
    return product;
  }
}

class StandardFizzBuzzComputationPipelineProductImpl implements IFizzBuzzComputationPipelineProduct {
  private static readonly PRODUCT_NAME = "StandardFizzBuzzComputationPipelineProduct";
  private static readonly PRODUCT_VERSION = "1.0.0-PIPELINE-PRODUCT";

  private readonly resolutionFacade: { resolveValue: (value: number) => string };
  private readonly rangeIterator: IFizzBuzzRangeIterator | null;
  private readonly governanceEnforcer: ((value: number, inner: (v: number) => string) => string) | null;
  private readonly mediationOrchestrator: {
    orchestrateDirectiveResolution: (value: number, inner: (v: number) => string) => string;
    orchestrateRangeDirectiveResolution: (start: number, end: number, inner: (v: number) => string) => readonly string[];
  } | null;
  private readonly configurationProfile: string;
  private readonly slaThresholdMs: number;
  private readonly cacheEnabled: boolean;
  private constructedAt: number = performance.now();

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
  }

  getProductName(): string {
    return StandardFizzBuzzComputationPipelineProductImpl.PRODUCT_NAME;
  }

  getProductVersion(): string {
    return StandardFizzBuzzComputationPipelineProductImpl.PRODUCT_VERSION;
  }

  getPipelineConfigurationProfile(): string {
    return this.configurationProfile;
  }

  getUnderlyingIterator(): IFizzBuzzRangeIterator | null {
    return this.rangeIterator;
  }

  resolveSingleValue(value: number): string {
    const builder = this;
    function execInner(v: number): string {
      return (builder.mediationOrchestrator !== null
        ? builder.mediationOrchestrator.orchestrateDirectiveResolution(v, (w: number) =>
            (builder.governanceEnforcer !== null
              ? builder.governanceEnforcer(w, (x: number) => builder.resolutionFacade.resolveValue(x))
              : builder.resolutionFacade.resolveValue(w)),
          )
        : (builder.governanceEnforcer !== null
            ? builder.governanceEnforcer(v, (w: number) => builder.resolutionFacade.resolveValue(w))
            : builder.resolutionFacade.resolveValue(v)));
    }
    return execInner(value);
  }

  resolveRange(start: number, end: number): readonly string[] {
    const iterator = this.rangeIterator !== null
      ? this.rangeIterator
      : new StandardFizzBuzzRangeIteratorImpl(start, end, (v: number) => this.resolveSingleValue(v));
    const results: string[] = [];
    iterator.reset();
    while (iterator.hasNext()) {
      results.push(iterator.next().getValue());
    }
    return results;
  }

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

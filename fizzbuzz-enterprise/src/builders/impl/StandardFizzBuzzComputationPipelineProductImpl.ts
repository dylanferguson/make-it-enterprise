import { AbstractBaseFizzBuzzComputationPipelineProduct } from "../abstracts/AbstractBaseFizzBuzzComputationPipelineProduct.js";
import type { IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";
import type { IFizzBuzzRangeIterator } from "../../iterators/contracts/IFizzBuzzRangeIterator.js";
import { StandardFizzBuzzRangeIteratorImpl } from "../../iterators/impl/StandardFizzBuzzRangeIteratorImpl.js";

const PRODUCT_NAME = "StandardFizzBuzzComputationPipelineProduct";
const PRODUCT_VERSION = "1.0.0-PIPELINE-PRODUCT";

export class StandardFizzBuzzComputationPipelineProductImpl
  extends AbstractBaseFizzBuzzComputationPipelineProduct
{
  protected readonly productName: string = PRODUCT_NAME;
  protected readonly productVersion: string = PRODUCT_VERSION;

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
    super(
      resolutionFacade,
      rangeIterator,
      governanceEnforcer,
      mediationOrchestrator,
      configurationProfile,
      slaThresholdMs,
      cacheEnabled,
    );
  }

  override resolveSingleValue(value: number): string {
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

  override resolveRange(start: number, end: number): readonly string[] {
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
}

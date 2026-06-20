import { AbstractBaseFizzBuzzComputationPipelineBuilder } from "../abstracts/AbstractBaseFizzBuzzComputationPipelineBuilder.js";
import type { IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";
import { StandardFizzBuzzComputationPipelineProductImpl } from "./StandardFizzBuzzComputationPipelineProductImpl.js";

const BUILDER_NAME = "StandardFizzBuzzComputationPipelineBuilder";
const BUILDER_VERSION = "1.0.0-BUILDER";

export class StandardFizzBuzzComputationPipelineBuilderImpl extends AbstractBaseFizzBuzzComputationPipelineBuilder {
  private static readonly BUILDER_NAME = BUILDER_NAME;
  private static readonly BUILDER_VERSION = BUILDER_VERSION;

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

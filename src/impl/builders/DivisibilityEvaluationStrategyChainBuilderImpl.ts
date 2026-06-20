import { AbstractBaseDivisibilityEvaluationStrategyChainBuilder } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainBuilder.js";
import type { IDivisibilityEvaluationStrategyChainLink } from "../../contracts/IDivisibilityEvaluationStrategyChainLink.js";

export class DivisibilityEvaluationStrategyChainBuilderImpl extends AbstractBaseDivisibilityEvaluationStrategyChainBuilder {
  private static readonly BUILDER_NAME = "DivisibilityEvaluationStrategyChainBuilderImpl";

  constructor() {
    super(DivisibilityEvaluationStrategyChainBuilderImpl.BUILDER_NAME);
  }

  override build(): IDivisibilityEvaluationStrategyChainLink {
    return this.assembleChain(this.links);
  }
}

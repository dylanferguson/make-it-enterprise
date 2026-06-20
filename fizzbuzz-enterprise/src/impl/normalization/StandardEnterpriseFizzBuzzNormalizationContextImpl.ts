import { AbstractBaseEnterpriseFizzBuzzNormalizationContext } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzNormalizationContext.js";
import type { IEnterpriseFizzBuzzNormalizationContext } from "../../contracts/IEnterpriseFizzBuzzNormalizationContext.js";

export class StandardEnterpriseFizzBuzzNormalizationContextImpl extends AbstractBaseEnterpriseFizzBuzzNormalizationContext {
  clone(): IEnterpriseFizzBuzzNormalizationContext {
    const cloned = new StandardEnterpriseFizzBuzzNormalizationContextImpl(
      this.getOriginalResult(),
      this.getComputationValue(),
      this.getComputationContextId(),
    );
    cloned.setNormalizedResult(this.getNormalizedResult());
    for (const stageName of this.getNormalizationStageNames()) {
      cloned.recordStageVisit(stageName);
    }
    return cloned;
  }
}

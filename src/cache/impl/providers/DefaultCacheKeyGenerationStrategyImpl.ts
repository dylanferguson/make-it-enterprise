import type { ICacheKey } from "../../contracts/index.js";
import { DivisibilityEvaluationCacheKeyImpl } from "../keys/DivisibilityEvaluationCacheKeyImpl.js";

export class DefaultCacheKeyGenerationStrategyImpl {
  private static readonly STRATEGY_NAME = "DefaultCacheKeyGenerationStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-KEY-GENERATION";

  getStrategyName(): string { return DefaultCacheKeyGenerationStrategyImpl.STRATEGY_NAME; }
  getStrategyVersion(): string { return DefaultCacheKeyGenerationStrategyImpl.STRATEGY_VERSION; }

  generateKey(dividend: number, divisor: number): ICacheKey {
    return new DivisibilityEvaluationCacheKeyImpl(dividend, divisor);
  }

  getKeyGenerationDescriptor(): string {
    return `DefaultKeyGeneration[keyType=DivisibilityEvaluationCacheKey]`;
  }
}

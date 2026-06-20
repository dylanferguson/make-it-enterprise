import { AbstractBaseCacheAwareExpressionEvaluatorDecorator } from "../../abstracts/index.js";
import type { IEnterpriseComputationCacheManager, ICacheAwareExpressionEvaluatorDecorator } from "../../contracts/index.js";
import type { IEnterpriseDivisibilityExpression, IEnterpriseDivisibilityExpressionEvaluationResult, IEnterpriseDivisibilityExpressionEvaluator } from "../../../expressionengine/contracts/index.js";
import { DivisiblityExpressionEvaluationResultImpl } from "../../../expressionengine/impl/results/DivisiblityExpressionEvaluationResultImpl.js";
import { DivisibilityEvaluationCacheKeyImpl } from "../keys/DivisibilityEvaluationCacheKeyImpl.js";
import { CachedDivisibilityEvaluationResultEntryImpl } from "../entries/CachedDivisibilityEvaluationResultEntryImpl.js";

export class CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl
  extends AbstractBaseCacheAwareExpressionEvaluatorDecorator
  implements IEnterpriseDivisibilityExpressionEvaluator, ICacheAwareExpressionEvaluatorDecorator
{
  private static readonly DECORATOR_NAME = "CacheAwareModuloOperatorExpressionEvaluatorDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-CACHE-AWARE-DECORATOR";
  private static readonly SUPPORTED_EXPRESSION_TYPES = ["MODULO_REMAINDER_DIVISIBILITY_EXPRESSION"];

  private readonly delegatingEvaluator: IEnterpriseDivisibilityExpressionEvaluator;
  private readonly cacheManager: IEnterpriseComputationCacheManager;
  private evaluationCount: number = 0;
  private cacheHitCount: number = 0;

  constructor(
    delegatingEvaluator: IEnterpriseDivisibilityExpressionEvaluator,
    cacheManager: IEnterpriseComputationCacheManager,
  ) {
    super(CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.DECORATOR_NAME, CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.DECORATOR_VERSION);
    this.delegatingEvaluator = delegatingEvaluator;
    this.cacheManager = cacheManager;
  }

  getSupportedExpressionTypes(): readonly string[] {
    return CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.SUPPORTED_EXPRESSION_TYPES;
  }

  canEvaluate(expression: IEnterpriseDivisibilityExpression): boolean {
    return CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.SUPPORTED_EXPRESSION_TYPES.includes(
      expression.getExpressionType(),
    );
  }

  evaluate(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluationResult {
    this.evaluationCount++;
    const cacheKey = new DivisibilityEvaluationCacheKeyImpl(expression.getDividend(), expression.getDivisor());
    const l1Entry = this.cacheManager.getL1CacheLevel<boolean>().get(cacheKey);
    if (l1Entry !== null) {
      this.cacheHitCount++;
      return new DivisiblityExpressionEvaluationResultImpl(
        expression.getDividend(), expression.getDivisor(), l1Entry.getCachedValue(),
        `${CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.DECORATOR_NAME}::L1_CACHE_HIT`,
      );
    }
    const l2Entry = this.cacheManager.getL2CacheLevel<boolean>().get(cacheKey);
    if (l2Entry !== null) {
      this.cacheHitCount++;
      const l1Promote = new CachedDivisibilityEvaluationResultEntryImpl(cacheKey, l2Entry.getCachedValue());
      this.cacheManager.getL1CacheLevel<boolean>().put(cacheKey, l1Promote);
      return new DivisiblityExpressionEvaluationResultImpl(
        expression.getDividend(), expression.getDivisor(), l2Entry.getCachedValue(),
        `${CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.DECORATOR_NAME}::L2_CACHE_HIT`,
      );
    }
    const result = this.delegatingEvaluator.evaluate(expression);
    const newEntry = new CachedDivisibilityEvaluationResultEntryImpl(cacheKey, result.isDivisible());
    this.cacheManager.getL1CacheLevel<boolean>().put(cacheKey, newEntry);
    this.cacheManager.getL2CacheLevel<boolean>().put(cacheKey, newEntry);
    return result;
  }

  override getDecoratorName(): string { return CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.DECORATOR_NAME; }
  override getDecoratorVersion(): string { return CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.DECORATOR_VERSION; }

  override getCacheManager(): IEnterpriseComputationCacheManager { return this.cacheManager; }

  override getDelegatingEvaluatorName(): string {
    return this.delegatingEvaluator.getEvaluatorName();
  }

  getEvaluatorName(): string { return CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.DECORATOR_NAME; }
  getEvaluatorVersion(): string { return CacheAwareModuloOperatorExpressionEvaluatorDecoratorImpl.DECORATOR_VERSION; }

  getEvaluationCount(): number { return this.evaluationCount; }
  getCacheHitCount(): number { return this.cacheHitCount; }

  override getDecoratorDescriptor(): string {
    return `CacheAwareModuloDecorator[delegate=${this.getDelegatingEvaluatorName()}, ` +
      `evaluations=${this.evaluationCount}, cacheHits=${this.cacheHitCount}, ` +
      `manager=${this.cacheManager.getCacheManagerDescriptor()}]`;
  }
}

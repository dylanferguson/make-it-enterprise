import { AbstractBaseCacheKey } from "../../abstracts/index.js";

export class DivisibilityEvaluationCacheKeyImpl extends AbstractBaseCacheKey {
  private static readonly KEY_TYPE = "DIVISIBILITY_EVALUATION_CACHE_KEY";
  private readonly dividend: number;
  private readonly divisor: number;

  constructor(dividend: number, divisor: number) {
    super();
    this.dividend = dividend;
    this.divisor = divisor;
  }

  override getKeyHash(): string {
    return `DivEval:${this.dividend}:${this.divisor}`;
  }

  override getKeyDescriptor(): string {
    return `DivisibilityEvaluationCacheKey[dividend=${this.dividend}, divisor=${this.divisor}]`;
  }

  override getKeyComponents(): readonly unknown[] {
    return [this.dividend, this.divisor, DivisibilityEvaluationCacheKeyImpl.KEY_TYPE];
  }

  getDividend(): number { return this.dividend; }
  getDivisor(): number { return this.divisor; }
}

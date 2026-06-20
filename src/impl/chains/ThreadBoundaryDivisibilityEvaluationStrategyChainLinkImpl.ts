import { AbstractBaseDivisibilityEvaluationStrategyChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainLink.js";

export class ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl extends AbstractBaseDivisibilityEvaluationStrategyChainLink {
  private static readonly LINK_NAME = "ThreadBoundaryDivisibilityEvaluationStrategyChainLink";
  private static readonly LINK_PRIORITY = 600;
  private static readonly THREAD_POOL_MAX = 4;

  private readonly threadLocalContext: Map<string, unknown> = new Map();
  private static threadPoolSequence: number = 0;

  constructor() {
    super(
      ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl.LINK_NAME,
      ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl.LINK_PRIORITY,
    );
  }

  override evaluate(dividend: number, divisor: number): number {
    this.assertOperandsValid(dividend, divisor);
    const threadId = this.acquireVirtualThread();
    const correlationToken = this.generateTransactionToken(dividend, divisor, threadId);
    try {
      this.threadLocalContext.set("threadId", threadId);
      this.threadLocalContext.set("correlationToken", correlationToken);
      this.threadLocalContext.set("dividend", dividend);
      this.threadLocalContext.set("divisor", divisor);
      return this.proceedToNext(dividend, divisor);
    } finally {
      this.releaseVirtualThread(threadId);
      this.threadLocalContext.delete("threadId");
      this.threadLocalContext.delete("correlationToken");
      this.threadLocalContext.delete("dividend");
      this.threadLocalContext.delete("divisor");
    }
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return false;
  }

  getThreadLocalContext(): ReadonlyMap<string, unknown> {
    return this.threadLocalContext;
  }

  private acquireVirtualThread(): number {
    ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl.threadPoolSequence =
      (ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl.threadPoolSequence + 1) %
      ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl.THREAD_POOL_MAX;
    return ThreadBoundaryDivisibilityEvaluationStrategyChainLinkImpl.threadPoolSequence;
  }

  private releaseVirtualThread(_threadId: number): void {
  }

  private generateTransactionToken(dividend: number, divisor: number, threadId: number): string {
    return `tx:${this.getLinkName()}:${dividend}:${divisor}:${threadId}:${Date.now()}`;
  }
}

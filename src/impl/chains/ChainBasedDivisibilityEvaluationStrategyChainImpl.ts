import { AbstractBaseDivisibilityEvaluationStrategyChain } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChain.js";
import type { IDivisibilityEvaluationStrategyChainLink } from "../../contracts/IDivisibilityEvaluationStrategyChainLink.js";

export class ChainBasedDivisibilityEvaluationStrategyChainImpl extends AbstractBaseDivisibilityEvaluationStrategyChain {
  private static readonly CHAIN_NAME = "ChainBasedDivisibilityEvaluationStrategyChain";
  private static readonly CHAIN_VERSION = "2.0.0-ENTERPRISE";
  private static readonly CHAIN_DESCRIPTION = "Chain of Responsibility based divisibility evaluation strategy chain";

  private readonly headLink: IDivisibilityEvaluationStrategyChainLink;

  constructor(headLink: IDivisibilityEvaluationStrategyChainLink) {
    super(
      ChainBasedDivisibilityEvaluationStrategyChainImpl.CHAIN_NAME,
      ChainBasedDivisibilityEvaluationStrategyChainImpl.CHAIN_VERSION,
      ChainBasedDivisibilityEvaluationStrategyChainImpl.CHAIN_DESCRIPTION,
    );
    this.headLink = headLink;
  }

  override evaluate(dividend: number, divisor: number): number {
    return this.templateMethodEvaluate(dividend, divisor);
  }

  protected override doEvaluate(dividend: number, divisor: number): number {
    return this.headLink.evaluate(dividend, divisor);
  }

  getHeadLink(): IDivisibilityEvaluationStrategyChainLink {
    return this.headLink;
  }
}

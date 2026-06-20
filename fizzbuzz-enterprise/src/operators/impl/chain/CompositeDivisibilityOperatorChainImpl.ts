import type { IDivisibilityOperator } from "../../contracts/IDivisibilityOperator.js";
import type { IDivisibilityOperatorDelegationChainHandler } from "../../contracts/IDivisibilityOperatorDelegationChainHandler.js";

export class CompositeDivisibilityOperatorChainImpl implements IDivisibilityOperator {
  private static readonly OPERATOR_NAME = "CompositeDivisibilityOperatorChain";
  private static readonly OPERATOR_VERSION = "1.0.0-COMPOSITE-CHAIN-OPERATOR";

  private readonly chainHead: IDivisibilityOperatorDelegationChainHandler | null;

  constructor(chainHead: IDivisibilityOperatorDelegationChainHandler | null) {
    this.chainHead = chainHead;
  }

  getOperatorName(): string {
    return CompositeDivisibilityOperatorChainImpl.OPERATOR_NAME;
  }

  getOperatorVersion(): string {
    return CompositeDivisibilityOperatorChainImpl.OPERATOR_VERSION;
  }

  isDivisibleBy(dividend: number, divisor: number): boolean {
    if (this.chainHead === null) {
      throw new Error(
        `[${CompositeDivisibilityOperatorChainImpl.OPERATOR_NAME}] No chain handlers registered — cannot evaluate divisibility`,
      );
    }
    return this.chainHead.evaluateDivisibility(dividend, divisor);
  }

  getChainHead(): IDivisibilityOperatorDelegationChainHandler | null {
    return this.chainHead;
  }
}

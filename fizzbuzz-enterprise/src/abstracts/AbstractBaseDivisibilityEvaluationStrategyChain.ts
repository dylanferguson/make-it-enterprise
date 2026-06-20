import type { IDivisibilityEvaluationStrategyChain } from "../contracts/IDivisibilityEvaluationStrategyChain.js";

export abstract class AbstractBaseDivisibilityEvaluationStrategyChain
  implements IDivisibilityEvaluationStrategyChain
{
  protected static readonly DEFAULT_CHAIN_NAME = "AbstractBaseDivisibilityEvaluationStrategyChain";
  protected static readonly DEFAULT_CHAIN_VERSION = "1.0.0-CHAIN";
  protected static readonly DEFAULT_CHAIN_DESCRIPTION = "Abstract base divisibility evaluation strategy chain";

  private readonly chainName: string;
  private readonly chainVersion: string;
  private readonly chainDescription: string;

  constructor(
    chainName: string = AbstractBaseDivisibilityEvaluationStrategyChain.DEFAULT_CHAIN_NAME,
    chainVersion: string = AbstractBaseDivisibilityEvaluationStrategyChain.DEFAULT_CHAIN_VERSION,
    chainDescription: string = AbstractBaseDivisibilityEvaluationStrategyChain.DEFAULT_CHAIN_DESCRIPTION,
  ) {
    this.chainName = chainName;
    this.chainVersion = chainVersion;
    this.chainDescription = chainDescription;
  }

  abstract evaluate(dividend: number, divisor: number): number;

  getChainName(): string {
    return this.chainName;
  }

  getChainVersion(): string {
    return this.chainVersion;
  }

  getChainDescription(): string {
    return this.chainDescription;
  }

  protected assertOperandsValid(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend) || !Number.isFinite(divisor)) {
      throw new Error(
        `[${this.chainName}] Invalid operands: dividend=${dividend}, divisor=${divisor}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.chainName}] Division by zero intercepted in strategy chain`,
      );
    }
  }

  protected templateMethodEvaluate(
    dividend: number,
    divisor: number,
  ): number {
    this.assertOperandsValid(dividend, divisor);
    this.preEvaluate(dividend, divisor);
    const result = this.doEvaluate(dividend, divisor);
    const postProcessed = this.postProcessResult(result, dividend, divisor);
    this.postEvaluate(dividend, divisor, postProcessed);
    return postProcessed;
  }

  protected abstract doEvaluate(dividend: number, divisor: number): number;

  protected preEvaluate(_dividend: number, _divisor: number): void {
  }

  protected postEvaluate(_dividend: number, _divisor: number, _result: number): void {
  }

  protected postProcessResult(result: number, _dividend: number, _divisor: number): number {
    if (Object.is(result, -0)) {
      return 0;
    }
    return result;
  }
}

import { AbstractBaseDivisibilityEvaluationSupervisionChain } from "../../abstracts/AbstractBaseDivisibilityEvaluationSupervisionChain.js";

export class EnterpriseDivisibilityEvaluationSupervisionChainImpl
  extends AbstractBaseDivisibilityEvaluationSupervisionChain
{
  constructor(chainName: string, chainVersion: string) {
    super(chainName, chainVersion);
  }

  override evaluate(dividend: number, divisor: number): boolean {
    return this.executeLinkChain(dividend, divisor);
  }
}
